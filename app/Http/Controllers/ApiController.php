<?php

namespace App\Http\Controllers;

use App\Helpers\JWT;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class ApiController extends Controller {
    //
    public function notSupport(Request $request) {
        $result = Controller::RESULT_ERROR(__('messages.operation_not_support'));
        return response()->json($result);
    }
    public function index(Request $request) {
        php_debugger();
        $result = Controller::RESULT_SUCCESS();
        $request_params = $request->all();
        $files = [];
        if (isset($request_params['params'])) {
            $params = jsonSerialize($request_params['params']);

            unset($request_params['params']);
            $files = $request_params;
        } else {
            $params = $request_params;
        }
        if (isset($request_params['token']) && !isset($params['token'])) {
            $params['token'] = $request_params['token'];
        }
        if (isset($files['token'])) {
            unset($files['token']);
        }
        if (isset($files['X-CSRF-TOKEN'])) {
            unset($files['X-CSRF-TOKEN']);
        }
        $params['baseHref'] = $request->getSchemeAndHttpHost();
        if (isset($params['action'])) {
            if ($params['action'] == 'login') {
                $result = $this->login($request);
            } else if ($params['action'] == 'logout') {
                $result = $this->logout($request);
            } else {
                list($status, $user) = $this->checkAuthen($params['token']);
                if ($status == false) {
                    if ($user == null) {
                        $result = Controller::RESULT_ERROR(__('messages.permission_denied'));
                    } else {
                        $result = Controller::RESULT_EXPIRED();
                    }
                } else {
                    switch ($params['action']) {
                        case 'logout': {
                                $result = $this->logout($request);
                                break;
                            }

                        case _ACTION_GET_ITEM_: {
                                switch ($params['item_type']) {
                                    case _ITEM_URL_: {
                                            $result['data'] = getItems($user, $params);
                                            break;
                                        }
                                }
                                break;
                            }
                    }
                }
            }
        }
        return response()->json($result);
    }
    function login(Request $request) {
        $result = Controller::RESULT_SUCCESS();
        $params = $request->all();
        $params = jsonSerialize($params['params']);
        $remember = isset($params['remember']) ? $params['remember'] == 'on' : false;
        $email = strtolower($params['email']);
        $user = User::where('email', $email)->first();

        if ($user != null) {
            // check password
            if (Hash::check($params['password'], $user->password) == false) {
                $result = Controller::RESULT_ERROR(__('auth.failed'));
            }
        } else {
            $result = Controller::RESULT_ERROR(__('auth.failed'));
        }
        if ($result['err'] == _ERR_SUCCESS_) {
            $valid = 604800; //7 days
            if ($remember) {
                $valid = 31104000; //360 days
            }
            $iat = timeUtc();
            $exp = $iat + $valid;

            $payload = array(
                'user_id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'iat' => timeUtc(),
                'exp' => $exp,
                'v' => env('TOKEN_VERSION', 1)
            );
            $token = JWT::encode($payload, _JWT_SECRET_);
            $result['token'] = $token;
        }
        return $result;
    }
    function logout(Request $request) {
        $result = Controller::RESULT_SUCCESS();
        Auth::logout();
        //clear session
        Cookie::queue(Cookie::forget('user'));
        if ($request != null && $request->session()) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }
        return $result;
    }
    function tryCheckAuthen($token) {
        list($headb64, $bodyb64, $cryptob64) = \explode('.', $token);
        $payload = jsonObjectize(base64_decode($bodyb64));
        $now = timeUtc();
        $valid = 43200; //just 12 housr
        if (isset($payload->iat) && $payload->iat + $valid  > $now) {
            return array(_TOKEN_VALID_, $payload, '');
        }
        return array(_TOKEN_INVALID_, null, '');
    }
    function checkAuthen($token) {
        if ($token) {
            list($status, $payload, $msg) = JWT::decode($token, _JWT_SECRET_, ['HS256']);
            if ($status == _TOKEN_INVALID_) {
                list($status, $payload, $msg) = $this->tryCheckAuthen($token);
            }
            if ($status != _TOKEN_INVALID_) {
                $user_id = $payload->user_id;
                $user = User::where('id', $user_id)->first();
                if (!isset($payload->v) || $payload->v != env('TOKEN_VERSION', 1)) {
                    return array(false, $user);
                } else {
                    return array($status == _TOKEN_VALID_, $user);
                }
            } else {
                return array(false, ['id' => 0]);
            }
        }
        return array(false, null);
    }
}
