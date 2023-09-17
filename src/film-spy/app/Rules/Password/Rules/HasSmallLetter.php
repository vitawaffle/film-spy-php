<?php

namespace App\Rules\Password\Rules;

use App\Rules\Password\RuleConfigurer;

class HasSmallLetter extends AbstractRule
{
    public function __construct(RuleConfigurer $configurer) {
        parent::__construct($configurer);
    }

    public static function getName(): string
    {
        return 'hasSmallLetter';
    }

    public function isValid(string $password): bool
    {
        return preg_match('/[a-z]/', $password);
    }
}
