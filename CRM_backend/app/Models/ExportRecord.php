<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;



    /**
 * @property int $id
 * @property int|null $opportunity_id
 * @property int $exported_by_user_id
 * @property string $export_type
 * @property string $export_format
 * @property string|null $file_name
 * @property int|null $record_count
 * @property string $status
 * @property string $exported_at
 * @property string|null $error_message
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereErrorMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereExportFormat($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereExportType($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereExportedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereExportedByUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereFileName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereOpportunityId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereRecordCount($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|ExportRecord whereStatus($value)
 * @mixin \Eloquent
 */
class ExportRecord extends Model
{
    use HasFactory;

    protected $guarded = ['id'];
    public $timestamps = false;

}
