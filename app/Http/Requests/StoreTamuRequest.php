<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTamuRequest extends FormRequest
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
            'nama' => ['required'],
            'jabatan' => ['required'],
            'hp' => ['required'],
            'instansi' => ['required'],
            'keperluan' => ['required'],
            'foto' => ['required'],
            'bidang_id' => ['required'],
            'temu' => ['nullable'],
        ];
    }
}
