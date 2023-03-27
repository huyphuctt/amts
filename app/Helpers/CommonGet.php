<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Pagination\Paginator;


function getItems($user, $params) {
    $table = '';
    $joins = [];
    $fields = [];
    $groupBy = [];
    if (isset($params['fields'])) {
        $fields = $params['fields'];
    }
    $order = isset($params['order']) ?  $params['order'] : 'id';
    $direction = isset($params['direction']) ?  $params['direction'] : _SORT_DESC_;
    $in_array = [];
    $conditions = [];
    $orGroup = [];
    switch ($params['item_type']) {
        case _ITEM_USER_: {
                break;
            }
        case _ITEM_NAICS_: {
                break;
            }
        case _ITEM_URL_: {
                $table = 'urls';
                break;
            }
        default:
            php_error('error');
            break;
    }
    $currentPage = isset($params['page']) ?  parseInterger($params['page']) : 1;
    $pageSize = isset($params['size']) ?  parseInterger($params['size']) : 50;
    Paginator::currentPageResolver(function () use ($currentPage) {
        return $currentPage;
    });

    $aPageSize = array(10, 20, 50, 100, 200, 300, 500, 1000);
    $builder = DB::table($table);
    if (count($joins) > 0) {
        foreach ($joins as $value) {
            if (isset($value['type'])) {
                if ($value['type'] == 'left') {
                    $builder->leftJoin("{$value['table']} AS {$value['as']}", $value['first'], $value['operator'], $value['second']);
                } else if ($value['type'] == 'right') {
                    $builder->rightJoin("{$value['table']} AS {$value['as']}", $value['first'], $value['operator'], $value['second']);
                } else if ($value['type'] == 'cross') {
                    $builder->crossJoin("{$value['table']} AS {$value['as']}", $value['first'], $value['operator'], $value['second']);
                }
            } else {
                $builder->join("{$value['table']} AS {$value['as']}", $value['first'], $value['operator'], $value['second']);
            }
        }
    }

    if (count($fields) > 0) {
        $builder->select($fields);
    }

    if (isset($params['or_filters']) && count($params['or_filters']) > 0) {
        $orGroup[] = $params['or_filters'];
    }
    if (count($in_array) > 0) {
        foreach ($in_array as $column => $in_details) {
            $builder->whereIn($column, $in_details);
        }
    }
    if (count($conditions) > 0) {
        foreach ($conditions as $value) {
            $builder = whereCase($builder, $table, $value);
        }
    }

    if (count($orGroup) > 0) {
        foreach ($orGroup as $key => $group) {
            $builder->where(function ($q) use ($group) {
                $first = $group[0];
                $first_table = '';
                if (isset($first['table'])) {
                    $first_table = $first['table'] . ".";
                }
                $q = orWhereCase($q, $first_table, $first);
                if (count($group) > 1) {
                    for ($i = 1; $i < count($group); $i++) {
                        $next = $group[$i];
                        $next_table = '';
                        if (isset($next['table'])) {
                            $next_table = $next['table'] . ".";
                        }
                        $q = orWhereCase($q, $next_table, $next);
                    }
                }
            });
        }
    }
    if (isset($params['filters'])) {
        foreach ($params['filters'] as $value) {
            if ($value) {
                $value_table = $table;
                if (isset($value['table'])) {
                    $value_table = $value['table'];
                }
                $builder = whereCase($builder, $value_table, $value);
            }
        }
    }
    if (strlen($order) > 0 && strlen($direction) > 0) {
        $builder->orderBy($order, $direction);
    }
    if (count($groupBy) > 0) {
        $builder->groupBy($groupBy);
    }
    DB::enableQueryLog();
    $items = $builder->paginate($pageSize);
    // POST get
    switch ($params['item_type']) {
        case _ITEM_USER_: {
                break;
            }
        case _ITEM_NAICS_: {
                break;
            }
        case _ITEM_URL_: {
                break;
            }
        default:
            php_error('error');
            break;
    }
    $queries = DB::getQueryLog();
    $paging = getPagingDisplay($items, $aPageSize, $params);
    return array('items' => $items->items(), 'pagination' => $paging);
}
