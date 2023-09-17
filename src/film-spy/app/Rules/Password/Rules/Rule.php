<?php

namespace App\Rules\Password\Rules;

interface Rule
{
    public static function getName(): string;
    public function isValid(string $password): bool;
    public function isActive(): bool;
}
