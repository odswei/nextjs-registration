import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from 'react';
import { useRouter } from 'next/router';

const schema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Email is invalid" }),
  password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  confirmPassword: z.string().min(8, { message: "Confirm password must be at least 8 characters long" }),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: "Date of birth must be in the format yyyy-mm-dd" }),
  bio: z.string().max(100, { message: "Bio must be less than 100 characters" }),
  gender: z.enum(["male", "female", "other"], {
    errorMap: (issue, _ctx) => {
      switch (issue.code) {
        case 'invalid_type':
          return { message:  "Gender must be one of 'male', 'female', or 'other'" };
        case 'invalid_enum_value':
          return { message:  "Gender must be one of 'male', 'female', or 'other'"  };
        default:
          return { message: 'Gender is invalid' };
        }
      },
    }),
  termsAndConditions: z.boolean().refine((val) => val === true, { message: "You must accept the terms and conditions" }),
});

type FormValues = z.infer<typeof schema>;

export default function RegistrationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState("");
  const onSubmit = (data: FormValues) => {
    try {
      router.push({
        pathname: "/welcome",
        query: { name: data.username },
       });
    } catch (error) {
      // Show error message
      setErrorMessage("Form submission failed. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto py-12 divide-y md:max-w-4xl">
      <div className="mt-4 max-w-md">
      <h2 className="text-2xl font-bold mb-5">Register</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              {...register("username")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-600" id="username-error">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email address
            </label>
            <input
              type="email"
              {...register("email")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600" id="email-error">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              {...register("password")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.password && (
              <p className="mt-2 text-sm text-red-600" id="password-error">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm password
            </label>
            <input
              type="password"
              {...register("confirmPassword")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.confirmPassword && (
              <p className="mt-2 text-sm text-red-600" id="confirmPassword-error">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-700">
              Date of birth
            </label>
            <input
              type="date"
              {...register("dateOfBirth")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.dateOfBirth && (
              <p className="mt-2 text-sm text-red-600" id="dateOfBirth-error">
                {errors.dateOfBirth.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">
              Bio
            </label>
            <textarea
              {...register("bio")}
              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
            />
            {errors.bio && (
              <p className="mt-2 text-sm text-red-600" id="bio-error">
                {errors.bio.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
              Gender
            </label>
            <select
              {...register("gender")}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Select your gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-2 text-sm text-red-600" id="gender-error">
                {errors.gender.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center">
              <input
                id="termsAndConditions"
                type="checkbox"
                {...register("termsAndConditions")}
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label htmlFor="termsAndConditions" className="ml-3 block text-sm font-medium text-gray-700">
                I agree to the <a href="#" className="text-indigo-600 hover:text-indigo-500">
                  terms and conditions
                </a>
              </label>
            </div>
            {errors.termsAndConditions && (
              <p className="mt-2 text-sm text-red-600" id="termsAndConditions-error">
                {errors.termsAndConditions.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}