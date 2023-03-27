import { f7 } from "framework7-react";
import Cookies from "js-cookie";
import CONST from "./Const";
import Utils from "./Utils";

const Common = {
    getAppDetail(location, role) {
        //Do something with the input
        var language = Cookies.get('language');
        var token = Utils.getLocalStorage('token');
        if (language === undefined || language === null) {
            language = '';
        }
        var authenticated = false;
        var userDetails = { name: '', position: '' };
        if (token === undefined || token === null || token.length === 0) {
            authenticated = false;
        } else {
            authenticated = (token.length > 0);
            if (authenticated === true) {
                try {
                    //get user name and position
                    var parts = token.split('.');
                    userDetails = JSON.parse(Buffer.from(parts[1], 'base64').toString());
                } catch (error) {

                }
            }
        }

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

    loadingDialog: null,
    showLoading(msg) {
        if (Common.loadingDialog != null) {
            Common.loadingDialog.setText(msg);
        } else {
            Common.loadingDialog = f7.dialog.preloader(msg);
        }
    },

    hideLoading() {
        if (Common.loadingDialog != null) {
            Common.loadingDialog.close();
            Common.loadingDialog = null;
        }
    },

    progressDialog: null,
    showProgress(title, msg, progress) {
        if (Common.progressDialog == null) {
            Common.progressDialog = f7.dialog.progress(title, progress);
        }
        Common.progressDialog.setProgress(progress);
        Common.progressDialog.setText(msg);
    },

    hideProgress() {
        try {
            if (Common.progressDialog != null) {
                Common.progressDialog.close();
                Common.progressDialog = null;
            }
        } catch (ex) {

        }
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