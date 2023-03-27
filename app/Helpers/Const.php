
<?php

/**
 * @copyright (C) 2022 by PhucNguyen
 * @version 1.0
 * @created 01/28/2022
 */

define('_SECRET_', '7k+OEEe5m3mPd7uuG7KBrwj8opwzyajRNT34FI03k/FMM5EYUyWmlrxw39qxR5TbETX6+riscDnkN/DGsPrTVg==');
define('_JWT_SECRET_', base64_decode(_SECRET_));

define('_ERR_SUCCESS_', 'success');
define('_ERR_WARNING_', 'warning');
define('_ERR_ERROR_', 'error');
define('_ERR_INFO_', 'info');
define('_ERR_EXPIRED_', 'expired');

define('_API_', '/api/v1');

define('_TOKEN_INVALID_', -1);
define('_TOKEN_VALID_', 0);
define('_TOKEN_EXPIRED_', 1);
define('_ACTION_GET_ITEM_', 'get_item');
define('_ACTION_SET_ITEM_', 'set_item');

define('_ITEM_URL_', 'url');
define('_ITEM_USER_', 'user');
define('_ITEM_NAICS_', 'naics');


define('_SORT_DESC_', 'DESC');
define('_SORT_ASC_', 'ASC');
