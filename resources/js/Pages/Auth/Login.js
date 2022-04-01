import React, { useEffect } from "react";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Guest from "@/Layouts/Guest";
import { Head, Link, useForm } from "@inertiajs/inertia-react";
import TextInput from "@/Components/TextInput";
import LoadingButton from "@/Components/LoadingButton";
import {
  LoginIcon
} from '@heroicons/react/outline';

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    username: "",
    password: "",
    remember: "",
  });

  useEffect(() => {
    return () => {
      reset("password");
    };
  }, []);

  const onHandleChange = (event) => {
    setData(
      event.target.name,
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value
    );
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login"));
  };

  return (
    <Guest>
      <Head title="Log in" />

      <form onSubmit={submit}>
        <TextInput
          className="mt-1 block w-full"
          label="Username"
          name="username"
          errors={errors.username}
          value={data.username}
          require={true}
          autoComplete="username"
          isFocused={true}
          onChange={(e) => setData("username", e.target.value)}
        />

        <TextInput
          className="mt-1 block w-full"
          label="Password"
          name="password"
          type="password"
          errors={errors.password}
          value={data.password}
          require={true}
          autoComplete="current-password"
          onChange={(e) => setData("password", e.target.value)}
        />

        <div className="block mt-4">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              value={data.remember}
              handleChange={onHandleChange}
            />

            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
        </div>

        <div className="flex flex-col justify-stretch mt-4">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="underline text-sm text-gray-600 hover:text-gray-900"
            >
              Forgot your password?
            </Link>
          )}

          <LoadingButton
            loading={processing}
            type="submit"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-600"
          >
            <LoginIcon className="-ml-0.5 mr-2 h-5 w-5" aria-hidden="true" />
            Login
          </LoadingButton>
        </div>
      </form>
    </Guest>
  );
}
