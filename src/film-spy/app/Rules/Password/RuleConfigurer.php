<?php

namespace App\Rules\Password;

interface RuleConfigurer
{
    public function getValue(string $name): mixed;
}
