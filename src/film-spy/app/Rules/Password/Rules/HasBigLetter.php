<?php

namespace App\Rules\Password\Rules;

use App\Rules\Password\RuleConfigurer;

class HasBigLetter extends AbstractRule
{
    public function __construct(RuleConfigurer $configurer)
    {
        parent::__construct($configurer);
    }

    public static function getName(): string
    {
        return 'hasBigLetter';
    }

    public function isValid(string $password): bool
    {
        return 1 === preg_match('/[A-Z]/', $password);
    }
}
