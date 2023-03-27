<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    static function RESULT_SUCCESS() {
        return [
            'err' => _ERR_SUCCESS_,
            'msg' => __('messages.operation_successfully')
        ];
    }

    static function RESULT_WARNING($msg) {
        return [
            'err' => _ERR_WARNING_,
            'msg' => $msg
        ];
    }

    static function RESULT_ERROR($msg = null) {
        return [
            'err' => _ERR_ERROR_,
            'msg' => $msg ? $msg : __('messages.there_was_an_error')
        ];
    }
    static function RESULT_EXPIRED($msg = null) {
        return [
            'err' => _ERR_EXPIRED_,
            'msg' => $msg ? $msg : __('messages.session_expired')
        ];
    }
    static function RESULT_INFO($msg = null) {
        return [
            'err' => _ERR_INFO_,
            'msg' => $msg ? $msg : __('messages.there_was_an_error')
        ];
    }
}
