<?php

use Illuminate\Support\Facades\DB;

function updateItems($user, $params) {
    $data = [];
    switch ($params['item_type']) {
        case _ITEM_USER_: {
                $table = _TBL_USERS_;
                break;
            }
        case _ITEM_NAICS_: {
                $table = _TBL_NAICS_;
                break;
            }
        case _ITEM_NAICSIZE_: {
                //UPDATE NAICS for url
                $url = $params['url'];
                if (isset($params['naics'])) {
                    $naicsize = $oResponse['naics'];
                    $naicsizes = [];
                    foreach ($naicsize as $naics) {
                        //insert to naics
                        $naicsizes['naics_id'] = $naics;
                        $naicsizes['url_id'] = $naics;
                        $oItemNaicsize->aData['url_id'] = $oRequest['url_id'];
                        $oItemNaicsize->aData['naics_id'] = $naics;
                    }

                    $oItemDaily = EzWeb::getItemByItemType(ModSystemItem_Daily);
            $oItemDaily->aData['site_id'] = $oRequest['site_id'];
            $oItemDaily->aData['type'] = 'filtered';
            $oItemDaily->insert();

                    DB::table(_TBL_NAICSIZE_)->insertOrIgnore($naicsizes);
                }
                $table = _TBL_NAICS_;
                break;
            }
        case _ITEM_URL_: {
                $table = _TBL_URLS_;
                break;
            }
        default:
            php_error('error');
            break;
    }
    return $data;
}
