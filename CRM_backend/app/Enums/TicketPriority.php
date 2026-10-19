<?php

namespace App\Enums;

enum TicketPriority: string
{
    case URGENT = 'Urgent';
    case HIGH = 'High';
    case MEDIUM = 'Medium';
    case LOW = 'Low';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
