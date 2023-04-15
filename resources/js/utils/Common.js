import { f7 } from "framework7-react";
import Cookies from "js-cookie";
import CONST from "./Const";
import Utils from "./Utils";

const Common = {
    getAppDetail(location, role) {
        //Do something with the input
        var language = Cookies.get('language');
        var user = Cookies.get('user');
        var token = Utils.getLocalStorage('token');
        if (language === undefined || language === null) {
            language = '';
        }


        var authenticated = true;
        var userDetails = { user_id: 0, name: '', position: '' };
        // if (token === undefined || token === null || token.length === 0) {
        //     authenticated = false;
        // } else {
        //     authenticated = (token.length > 0);
        //     if (authenticated === true) {
        //         try {
        //             //get user name and position
        //             var parts = token.split('.');
        //             userDetails = JSON.parse(Buffer.from(parts[1], 'base64').toString());
        //         } catch (error) {

        //         }
        //     }
        // }

        var details = {
            authenticated: authenticated,
            locale: 'en',
            user: {
                id: userDetails.user_id,
                name: userDetails.name,
                email: userDetails.email,
            },
            query: Utils.getQuery(location)
        };
        details.pages = [
            '',
            'signin.html',
            'index.html'
        ];
        return details;
    },

    showAlert(msg) {
        f7.dialog.alert(msg);
    },

    showConfirm(msg, yesCb, noCb) {
        f7.dialog.confirm(msg, yesCb, noCb);
    },

    progressDialog: null,
    showProgress(title, msg, progress) {
        if (Common.progressDialog == null) {
            Common.progressDialog = f7.dialog.progress(title, progress);
        }
        Common.progressDialog.setProgress(progress);
        Common.progressDialog.setText(msg);
        Common.closeProgress(Common.hideProgress, 60000);
    },

    hideProgress() {
        try {
            if (Common.progressDialog != null) {
                Common.progressDialog.close();
                Common.progressDialog = null;
            }
            if (Common.closeProgressTimer != null) {
                clearInterval(Common.closeProgressTimer);
                Common.executeOnceTimer = null;
            }
        } catch (ex) {

        }
    },
    closeProgressTimer: null,
    closeProgress(fn, delayMillis) {
        if (Common.closeProgressTimer != null) {
            clearInterval(Common.closeProgressTimer);
        }
        Common.executeOnceTimer = setInterval(function () {
            clearInterval(Common.executeOnceTimer);
            Common.executeOnceTimer = null;
            fn();
        }, delayMillis);
    },

    /**
     * [onToast description]
     * 
     * @param {[type]}
     *           msg [description]
     * @param {[type]}
     *           position [description]
     * @param {[type]}
     *           timeout [description]
     * @return {[type]} [description]
     */
    showToast(msg, position = CONST._TOAST_BOTTOM_, timeout = 1000) {
        if (f7.toast) {
            var toast = f7.toast.create({
                text: msg,
                position: position,
                closeTimeout: timeout,
            });
            if (toast) {
                toast.open();
            }
        }
    },

}
export default Common;