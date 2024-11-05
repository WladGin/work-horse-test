<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ContactStoreOrUpdateRequest;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Symfony\Component\HttpFoundation\Response;

class ApiContactController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(ContactStoreOrUpdateRequest $request): JsonResponse
    {
        $contact = Contact::query()->create($request->validated());

        return response()->json($contact, Response::HTTP_CREATED);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ContactStoreOrUpdateRequest $request, Contact $contact): JsonResponse
    {
        $isUpdate = $contact->update($request->validated());

        if ($isUpdate) {
            return response()->json($contact, Response::HTTP_OK);
        }

        return response()->json(['error' => 'Contact not updated'], Response::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Contact $contact): JsonResponse
    {
        $isDeleted = $contact->delete();

        if ($isDeleted) {
            return response()->json(null, Response::HTTP_NO_CONTENT);
        }

        return response()->json(['error' => 'Contact not deleted'], Response::HTTP_BAD_REQUEST);
    }
}
