<?php

namespace App\Rules\Password;

use App\Rules\Password\Rules\{HasBigLetter, HasNumber, HasSmallLetter, MinimalLength};

class HardCodeRuleConfigurer implements RuleConfigurer
{
    public function getValue(string $name): mixed
    {
        return match ($name) {
            HasBigLetter::getName(), HasNumber::getName(), HasSmallLetter::getName() => true,
            MinimalLength::getName() => 8,
            default => null,
        };
    }
}
