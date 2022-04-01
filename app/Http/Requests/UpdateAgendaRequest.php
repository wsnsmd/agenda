<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAgendaRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'bidang_id' => ['required'],
            'title' => ['required'],
            'tempat' => ['required'],
            'tanggal' => ['required', 'date'],
            'jam_mulai' => ['required'],
            'jam_selesai' => ['nullable'],
            'secara' => ['required'],
            'pic' => ['nullable'],
            'keterangan' => ['nullable'],
        ];
    }
}
