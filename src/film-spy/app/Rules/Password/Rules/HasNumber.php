<?php

namespace App\Rules\Password\Rules;

use App\Rules\Password\RuleConfigurer;

class HasNumber extends AbstractRule
{
    public function __construct(RuleConfigurer $configurer)
    {
        parent::__construct($configurer);
    }

    public static function getName(): string
    {
        return 'hasNumber';
    }

    public function isValid(string $password): bool
    {
        return preg_match('/[0-9]/', $password);
    }
}
