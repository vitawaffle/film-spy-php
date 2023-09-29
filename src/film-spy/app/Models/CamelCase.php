<?php

namespace App\Models;

use Illuminate\Support\Str;

trait CamelCase
{
    /** @inheritdoc */
    public function getAttribute(mixed $key): mixed
    {
        if (array_key_exists($key, $this->getRelations()))
            return parent::getAttribute($key);

        return parent::getAttribute(Str::snake($key));
    }

    /** @inheritdoc */
    public function setAttribute(mixed $key, mixed $value): mixed
    {
        return parent::setAttribute(Str::snake($key), $value);
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
