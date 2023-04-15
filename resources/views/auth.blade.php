<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>AMTS</title>

    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="theme-color" content="#ffffff">
    <link rel="manifest" href="manifest.json" />
    <!-- Google Font: Source Sans Pro -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback">

    <!-- Common -->
    <link rel="stylesheet" href="{{ asset("/css/auth.css") }}">
    <meta name="csrf-token" content="{{ csrf_token() }}">
</head>

@if ($page == '')

<body class="hold-transition login-page">
    <div class="login-box">
        <div class="card">
            <div class="card-header">
                <p class="card-title">AMTS</p>
            </div>
            <div class="card-body login-card-body">
                <form method="POST" action="{{ route('login')}}">
                    {!! csrf_field() !!}
                    <div class="form-group has-feedback">
                        <label>Email</label> <input type="email" class="form-control" name="email" placeholder="Email" id="inputEmail" value="{{ old('email') }}">

                    </div>
                    <div class="form-group has-feedback">
                        <label>Password</label> <input type="password" class="form-control" name="password" placeholder="Password" id="inputPassword" value="{{ old('password') }}">
                    </div>
                    <div class="form-group">
                        <div class="checkbox col-xs-8">
                            <input type="checkbox" id="remember" name="remember" {{ old('remember') ? 'checked="true"' : '' }}>
                            <label for="remember">{{__('auth.remember_me')}}</label>
                        </div>
                    </div>
                    <div class="form-group justify-content-center">
                        <button type="submit" class="btn btn-primary btn-block" onclick="if(validateForm() == null) return false;">{{__('auth.sign_in')}}</button>
                    </div>
                </form>
                <p class="mb-1">
                    <a href="recover.html">{{__('auth.forget_password')}}</a>
                </p>
            </div>
        </div>
    </div>

    <!-- <div class="login-box">
        <div class="card card-outline card-main">
            <div class="card-body login-card-body">
                <form method="POST" action="{{ route('login')}}">
                    {!! csrf_field() !!}
                    <div class="form-group has-feedback">
                        <label>Email</label>
                        <input type="email" class="form-control" name="email" placeholder="Email" id="inputEmail" value="{{ old('email') }}">
                    </div>
                    <div class="form-group has-feedback">
                        <label>Password</label>
                        <input type="password" class="form-control" name="password" placeholder="Password" id="inputPassword" value="{{ old('password') }}">

                    </div>
                    @if($errors->any())
                    <h5 class="text-danger">{{$errors->first()}}</h5>
                    @endif
                    <div class="row">
                        <div class="col-7">
                            <div class="icheck-primary">
                                <input type="checkbox" id="remember" name="remember" {{ old('remember') ? 'checked="true"' : '' }}>
                                <label for="remember">{{__('auth.remember_me')}}</label>
                            </div>
                        </div>
                        <div class="col-5">
                            <button type="submit" class="btn text-white btn-primary btn-block" onclick="if(validateForm() == null) return false;">{{__('auth.sign_in')}}</button>
                        </div>
                    </div>
                </form>
                <p class="mb-1">
                    <a href="recover.html">{{__('auth.forget_password')}}</a>
                </p>
            </div>
        </div>
    </div> -->
    @elseif ($page == 'register')

    <body class="hold-transition register-page">
        <div class="register-box">
            <div class="card card-outline card-main">
                <div class="card-header text-center">
                    <a href="#" class="h1"><b>AMTS</a>
                </div>
                <div class="card-body">
                    <p class="login-box-msg">Register a new membership</p>

                    <form>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Full name">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Email" id="inputEmail">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Password" id="inputPassword">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Retype password" id="inputReEmail">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="agree">
                                    <label for="agreeTerms">
                                        I agree to the <a href="terms.html">terms</a>
                                    </label>
                                </div>
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn text-white btn-primary btn-block" onclick="performRegister(); return false;">Register</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </form>

                    <a href="signin.html" class="text-center">I already have a membership</a>
                </div>
                <!-- /.form-box -->
            </div><!-- /.card -->
        </div>
        <!-- /.register-box -->
        @else

        <body class="hold-transition login-page">
            <div class="login-box">
                <div class="card card-outline card-main">
                    <div class="card-header text-center">
                        <a href="#" class="h1"><b>{{ __('messages.app_name') }}</a>
                    </div>
                    <div class="card-body">
                        <p class="login-box-msg">{{__('messages.recover_title')}}</p>
                        <form action="post" url="">
                            <div class="input-group mb-3">
                                <input type="email" class="form-control" placeholder="{{__('messages.email')}}" id="inputEmail">
                                <div class="input-group-append">
                                    <div class="input-group-text">
                                        <span class="fas fa-envelope"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-12">
                                    <button type="submit" class="btn text-white btn-main btn-block" onclick="performRecover(); return false;">{{__('messages.recover')}}</button>
                                </div>
                                <!-- /.col -->
                            </div>
                        </form>

                        <p class="mt-3 mb-1">
                            <a href="signin.html">{{__('messages.sign_in')}}</a>
                        </p>
                    </div>

                    <!-- /.login-card-body -->
                </div>
            </div>
            @endif
            <!-- REQUIRED SCRIPTS -->

            <script>
                function authCb(data) {
                    // if (data.err != _ERR_SUCCESS_) {
                    showToast(data.msg, data.err, TOAST_TOP_CENTER);
                    // } else {
                    //     executeOnce(() => {
                    //         if (data.redirect_url) {
                    //             location.href = data.redirect_url;
                    //         } else {
                    //             // location.reload(true);
                    //         }
                    //     }, 2000);
                    // }
                }

                function validateForm() {
                    var aForm = {};
                    let email = $("#inputEmail").val().trim();
                    if (email.length == 0) {
                        showToast("{{ __('messages.field_required', ['FIELD' => __('messages.email')])}}", _ERR_INFO_, TOAST_TOP_CENTER);
                        $('#inputEmail').focus();
                        return null;
                    }

                    let password = $("#inputPassword").val().trim();
                    if (password.length == 0) {
                        showToast("{{ __('messages.field_required', ['FIELD' => __('messages.password')])}}", _ERR_INFO_, TOAST_TOP_CENTER);
                        $('#inputPassword').focus();
                        return null;
                    }
                    aForm.email = email;
                    aForm.password = password;
                    return aForm;
                }
            </script>
        </body>

</html>