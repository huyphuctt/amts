<?php

namespace App\Http\Controllers;

use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;

class AuthController extends Controller {
    //
    public function index(Request $request) {
        php_debugger();
        $params = $request->all();
        if (Auth::check()) {
            return Redirect::to('/');
        }
        return view("auth")->with(['page' => '']);
    }
    function doSignIn(Request $request) {
        php_debugger();
        $result = Controller::RESULT_SUCCESS();
        $params = $request->all();
        // $params = jsonSerialize($params['params']);
        $remember = isset($params['remember']) ? $params['remember'] == 'on' : false;
        $email = strtolower($params['email']);
        $user = User::where('email', $email)->first();
        if ($user != null) {
            if (Hash::check($params['password'], $user->password) == false) {
                $result = Controller::RESULT_ERROR(__('messages.failed'));
            } else {
                Auth::login($user, $remember);
                $redirect_url = '/';
                if (isset($params['reload'])) {
                    $redirect_url = $request->headers->get('referer');
                } else {
                    $redirect_url = isset($params['redirect_url']) ? $params['redirect_url'] : env('APP_URL');
                }
                Cookie::queue('user',  $user->id, 1000);
                return redirect()->intended($redirect_url);
            }
        } else {
            $result = Controller::RESULT_ERROR(__('messages.email_not_exist'));
        }
        return back()->withErrors([
            'msg' => $result['msg']
        ])->withInput();
    }
    function doSignOut(Request $request) {
        Auth::logout();
        //clear session
        Cookie::queue(Cookie::forget('user'));
        if ($request != null) {
            $request->session()->invalidate();
            $request->session()->regenerateToken();
        }

        $redirect_url = '/';
        return redirect()->intended($redirect_url);
    }

    public function indexRegister(Request $request) {
        if (Auth::check()) {
            return Redirect::to(env('APP_URL'));
        }

        $data = array();
        $xajax = \App\Http\Controllers\Controller::initAjax($request, array(AuthController::class));
        if ($xajax != null) {
            $data['xajax'] = $xajax;
        }
        $data['page'] = 'register';
        $data['baseHref'] = Controller::getBaseHref();
        return view('frontend.pages.auth')->with($data);
    }
    public function indexRecover(Request $request) {
        if (Auth::check()) {
            return Redirect::to(env('APP_URL'));
        }

        $data = array();
        $xajax = \App\Http\Controllers\Controller::initAjax($request, array(AuthController::class));
        if ($xajax != null) {
            $data['xajax'] = $xajax;
        }
        $data['page'] = 'recover';
        $data['baseHref'] = Controller::getBaseHref();
        return view('frontend.pages.auth')->with($data);
    }

    public function indexSetPassword(Request $request) {
        $params = $request->all(['id']);
        $data = array();

        //http://housedecorvr.vn/setpassword.html?id=2cf6de5d-2289-4007-b8da-855b2956a876
        //check ticket
        $ticket = DB::table(Controller::TBL_TICKETS)->where('uuid', $params['id'])->first();
        if ($ticket == null) {
            $data['valid'] = Controller::STATUS_INVALID;
        } else {
            //
            $data['valid'] = $ticket->status;
        }
        $data['ticket_id'] = $params['id'];
        $data['baseHref'] = Controller::getBaseHref();
        return view('platform.pages.setpassword')->with($data);
    }

    public function doSetPassword(Request $request) {
        $params = $request->all();
        $msg = null;
        // check data valid
        try {
            $ticket = DB::table(Controller::TBL_TICKETS)->where('uuid', $params['ticket_id'])->first();
            if ($ticket == null) {
                $msg = __('messages.link_expired');
            } else {
                //
                $ticketDetail = jsonSerialize($ticket->details);
                if ($ticket->status == Controller::STATUS_CREATED) {
                    //
                    $user =  User::where('id', $ticketDetail['user_id'])->first();
                    if ($user == null) {
                        $msg = __('messages.there_was_an_error');
                        $ticket->status = Controller::STATUS_INVALID;
                    } else {
                        $user->password = bcrypt($params['password']);
                        $user->status = Controller::STATUS_VERIFED;
                        if ($user->client_id > 0) {
                            DB::table(Controller::TBL_CLIENTS)->where('id', $user->client_id)->update(['status' => Controller::STATUS_VERIFED]);
                        }
                        $user->save();
                        $ticket->status = Controller::STATUS_OK;
                    }
                    // $ticket->save();
                    DB::table(Controller::TBL_TICKETS)->where('id', $ticket->id)->update(['status' => $ticket->status]);
                }
            }
        } catch (Exception $ex) {
            $msg = __('messages.there_was_an_error');
        }
        if ($msg == null) {
            return redirect()->back()->with('success', __('messages.password_has_been_set'));
        } else {
            return back()->withErrors([
                'msg' => $msg
            ])->withInput();
        }
    }

    /**
     * Ajax functions
     * */
    function performRegister($params) {
        $result = Controller::RESULT_SUCCESS();
        // Creating Rules for Email and Password
        // $rules = array(
        //     'email' => 'required|email', // make sure the email is an actual email
        //     'password' => 'required|alphaNum|min:8'
        //     // password has to be greater than 3 characters and can only be alphanumeric and);
        //     // checking all field
        // );
        // $validator = Validator::make(array(
        //     'email' => $params['email'],
        //     'password' => $params['password']
        // ), $rules);
        // if the validator fails, redirect back to the form
        // if ($validator->fails()) {
        //     //return Redirect::to('login')->withErrors($validator) // send back all errors to the login form
        //     //->withInput(Input::except('password')); // send back the input (not the password) so that we can repopulate the form
        //     $result['err'] = Controller::_ERR_WARNING_;
        //     $result['msg'] = __('messages.enter_email');
        // } else 
        $oRespX = new \xajaxResponse();
        return array($oRespX, $result);
    }
    function performRecover($params) {
        $result = Controller::RESULT_SUCCESS();
        $oRespX = new \xajaxResponse();
        return array($oRespX, $result);
    }
}
