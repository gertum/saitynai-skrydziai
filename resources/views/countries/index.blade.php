    <h1>Country List</h1>

    <ul>
        @foreach($countries as $country)
            <li>{{ $country->name }}</li>
        @endforeach
    </ul>
