<?php

/**
 * @copyright (C) 2022 by PhucNguyen
 * @version 1.0
 * @created 01/28/2022
 */

// use \Exception;

/**
 * Common utils
 * */
function php_debugger() {
    if (env('XDEBUG', false) == 1) {
        xdebug_break();
    }
    // echo $msg;
    // echo ('<p class="d-none">');
    // echo ($e->getMessage());
    // echo ('</p>');
}

function php_error($msg = null) {
    if (env('XDEBUG', false) == 1) {
        echo $msg;
    }
    // echo ('<p class="d-none">');
    // echo ($e->getMessage());
    // echo ('</p>');
}
if (!function_exists('jsonSerialize')) {
    /**
     *  Decode json string into array
     *  @param string $json
     *  @return null|array
     */
    function jsonSerialize($json) {
        try {
            $obj = json_decode($json, true);
            switch (json_last_error()) {
                case JSON_ERROR_DEPTH:
                    // ' - Maximum stack depth exceeded';
                    break;
                case JSON_ERROR_CTRL_CHAR:
                    //echo ' - Unexpected control character found';
                    break;
                case JSON_ERROR_SYNTAX:
                    //echo ' - Syntax error, malformed JSON';
                    break;
                case JSON_ERROR_NONE:
                    break;
            }

            return $obj;
        } catch (Exception $e) {
            return null;
        }
    }
}

if (!function_exists('jsonStringify')) {
    function jsonStringify($obj) {
        return json_encode($obj);
    }
}

if (!function_exists('jsonObjectize')) {
    /**
     *  Decode json string into stdClass
     *  @param string $json
     *  @return null|stdClass object
     */
    function jsonObjectize($json) {
        try {
            return json_decode($json);
        } catch (Exception $e) {
            return null;
        }
    }
}

if (!function_exists('cvt2Object')) {
    function cvt2Object($arr) {
        return jsonObjectize(jsonStringify($arr));
    }
}


if (!function_exists('timeUtc')) {
    function timeUtc() {
        $sUtc = gmdate("Y-m-d H:i:s", time());
        $iUtcTime = strtotime($sUtc);
        return $iUtcTime;
    }
}

function standardizeNumber($str) {
    $str = str_replace(',', '', $str);
    return $str;
}

function parseInterger($str) {
    $integer = 0;
    if ($str != null) {
        $str = trim(standardizeNumber($str));
        if (is_numeric($str)) {
            $integer = intval($str);
        }
    }
    return $integer;
}

function tryParseInterger($str) {
    $integer = 0;
    if ($str != null) {
        $str = standardizeNumber($str);
        if (is_numeric($str)) {
            $integer = intval($str);
        } else {
            $str = preg_replace('/[^0-9]/', '', $str); // = 7777
            $integer = intval($str);
        }
    }
    return $integer;
}

function parseBool($str) {
    $str = strtolower($str);
    switch ($str) {
        case 'yes':
        case '1':
            return true;
        default:
            return false;
    }
}
/**
 * End Common utils
 **/

/**
 * Specific utils
 **/
function getPagingDisplay($lengthAwarePaginator, $page_sizes, $params = [], $reverseDirection = false) {
    $page_count = $lengthAwarePaginator->lastPage();
    $page_current = $lengthAwarePaginator->currentPage();
    $page_size = $lengthAwarePaginator->perPage();
    $item_count = $lengthAwarePaginator->total();
    $page_start = 1;
    $page_end = $page_count;
    $display = 9;
    $from = 0;
    $to = 0;
    $radius = parseInterger($display / 2);
    if ($page_current - $radius > 0) {
        $page_start = $page_current - $radius;
    }
    if ($page_current + $radius < $page_count) {
        $page_end = $page_current + $radius;
    }
    $direction = isset($params['direction']) ? $params['direction'] : _SORT_DESC_;
    if ($reverseDirection == true) {
        $direction = ($direction == _SORT_DESC_) ? _SORT_ASC_ : _SORT_DESC_;
    }
    $from = ($page_current - 1) * $page_size + 1;
    $to = min($from +  $page_size - 1, $item_count);
    $filters = isset($params['filters']) && count($params['filters']) > 0 ? $params['filters'] : null;
    $arr = [
        //for display
        'page_sizes' => $page_sizes,
        'page_size' => $page_size,
        'page_start' => $page_start,
        'page_current' => $page_current,
        'page_end' => $page_end,
        'page_count' => $page_count,
        'item_count' => $item_count,
        'from' => $from,
        'to' => $to,
        //for query
        'action' => isset($params['action']) ? $params['action'] : '',
        'page' => $page_current,
        'size' => $page_size,
        'type' => isset($params['type']) ? $params['type'] : '',
        'text' => isset($params['text']) ? $params['text'] : '',
        'order' => isset($params['order']) ? $params['order'] : 'id',
        'filters' => $filters,
        'next' => isset($params['next']) ? $params['next'] : false,
        'direction' => $direction,
    ];
    return cvt2Object($arr);
}

function whereCase($builder, $table, $value) {
    if (!str_contains($table, '.') && strlen($table) > 0) {
        $table = $table . '.';
    }
    if ($value['operator'] == 'IN') {
        return $builder->whereIn("{$table}{$value['column']}", $value['value']);
    } else if ($value['operator'] == 'NOT IN') {
        return $builder->whereNotIn("{$table}{$value['column']}", $value['value'], $value['boolean']);
    } else if ($value['operator'] == 'BETWEEN') {
        return $builder->whereBetween("{$table}{$value['column']}", $value['value'], $value['boolean']);
    } else if ($value['operator'] == 'RAW') {
        return $builder->whereRaw($value['value']);
    } else if ($value['operator'] == 'IS NULL') {
        return $builder->whereNull("{$table}{$value['column']}", $value['boolean']);
    } else if ($value['operator'] == 'IS NOT NULL') {
        return $builder->whereNotNull("{$table}{$value['column']}", $value['boolean']);
    } else if ($value['operator'] == 'whereJsonDoesntContain') {
        return $builder->whereJsonDoesntContain("{$table}{$value['column']}", $value['value'], $value['boolean']);
    } else {
        return $builder->where("{$table}{$value['column']}", $value['operator'], $value['value'], $value['boolean']);
    }
}
function orWhereCase($builder, $table, $value) {
    if (!str_contains($table, '.') && strlen($table) > 0) {
        $table = $table . '.';
    }
    if ($value['operator'] == 'IN') {
        return $builder->orWhereIn("{$table}{$value['column']}", $value['value']);
        // }else if ($value['operator'] == 'NOT IN') {
        //     return $builder->orWhereNotIn("{$table}{$value['column']}", $value['value']);
    } else if ($value['operator'] == 'IS NULL') {
        return $builder->orWhereNull("{$table}{$value['column']}", $value['boolean']);
    } else if ($value['operator'] == 'IS NOT NULL') {
        return $builder->orWhereNotNull("{$table}{$value['column']}", $value['boolean']);
    } else if ($value['operator'] == 'whereJsonDoesntContain') {
        return $builder->orWhereJsonDoesntContain("{$table}{$value['column']}", $value['value'], $value['boolean']);
    } else {
        return $builder->orWhere("{$table}{$value['column']}", $value['operator'], $value['value'], $value['boolean']);
    }
}
