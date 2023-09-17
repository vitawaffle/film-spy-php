<?php

namespace App\Rules\Password\Rules;

use App\Rules\Password\RuleConfigurer;

class MinimalLength extends AbstractRule
{
    public function __construct(RuleConfigurer $configurer)
    {
        parent::__construct($configurer);
    }

    public static function getName(): string
    {
        return 'minimalLength';
    }

    public function isValid(string $password): bool
    {
        return strlen($password) >= $this->getValue();
    }
}
