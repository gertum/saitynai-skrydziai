<!-- countries/index.blade.php -->
@extends('layouts.app') <!-- Use your layout file if different -->

@section('content')
    <h1>Country List</h1>

    <ul>
        @foreach($countries as $country)
            <li>{{ $country->name }}</li>
        @endforeach
    </ul>
@endsection
