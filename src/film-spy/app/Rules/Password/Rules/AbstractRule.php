<?php

namespace App\Rules\Password\Rules;

use App\Rules\Password\RuleConfigurer;

abstract class AbstractRule implements Rule
{
    public function __construct(protected readonly RuleConfigurer $configurer)
    {
    }

    public function isActive(): bool
    {
        return null !== $this->getValue();
    }

    protected function getValue(): mixed
    {
        return $this->configurer->getValue($this->getName());
    }
}
