<?php

namespace App\Models;

use Illuminate\Support\Str;

trait CamelCase
{
    /** @inheritdoc */
    public function getAttribute(mixed $key): mixed
    {
        $snakedKey = Str::snake($key);

        if (array_key_exists($snakedKey, $this->getRelations()))
            return parent::getAttribute($snakedKey);

        return parent::getAttribute($key);
    }

    /** @inheritdoc */
    public function setAttribute(mixed $key, mixed $value): mixed
    {
        $snakedKey = Str::snake($key);

        if (array_key_exists($snakedKey, $this->getRelations()))
            return parent::setAttribute($snakedKey, $value);

        return parent::setAttribute($key, $value);
    }

    /** @inheritdoc */
    public function toArray(): mixed
    {
        $arr = parent::toArray();
        $camelCase = [];

        foreach ($arr as $key => $value)
            $camelCase[Str::camel($key)] = $value;

        return $camelCase;
    }
}
