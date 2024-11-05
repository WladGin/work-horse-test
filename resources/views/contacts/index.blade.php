@extends('layouts.app')
@section('content')
    <div id="contact_list" data-contacts="{{ json_encode($contacts) }}">
    </div>
@endsection
