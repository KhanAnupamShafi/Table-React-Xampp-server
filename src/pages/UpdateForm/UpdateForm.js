import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";

const UpdateForm = () => {
  const { id } = useParams();

  const [formData, setFormData] = useState([]);
  const [isConfirm, setIsConfirm] = useState(null);
  const [status, setStatus] = useState({});

  console.log(formData);

  useEffect(() => {
    fetch(`http://localhost/api/get_form.php?id=${id}`, {})
      .then((res) => res.json())
      .then((result) => {
        setFormData(result?.data?.fields[0]);

        // if (result.status === "success") {
        //   setIsConfirm(true);
        // }
        // setStatus(result);

        // reset();
      });
  }, [id]);

  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    console.log(data);

    fetch("http://localhost/api/submit_form.php", {
      method: "POST",
      // headers: { "Content-Type": "application/json", charset: "utf-8" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        if (result.status === "success") {
          setIsConfirm(true);
        }
        setStatus(result);

        reset();
      });
  };

  return (
    <div className="w-full mx-auto m-auto ">
      <form
        className="w-1/2 text-left m-auto border-4 border-sky-500 p-5"
        onSubmit={handleSubmit(onSubmit)}
      >
        {Object.keys(formData).map((data) => (
          <div key={data} className="flex flex-wrap -mx-3 mb-6 ">
            <div className="w-full  px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 broder-2"
                htmlFor="grid-first-name"
              >
                {formData[data].title}
              </label>
              {formData[data].type === "select" ? (
                <select
                  name={data}
                  {...register(data)}
                  {...formData[data].html_attr}
                  {...(formData[data].required === true && { required: true })}
                  {...(formData[data].readonly === true && { readOnly: true })}
                  {...(formData[data].default && {
                    defaultValue: formData[data].default,
                  })}
                >
                  {formData[data]?.options?.map((opt) => (
                    <option key={opt.key} value={opt.key}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : formData[data].type === "radio" ? (
                <>
                  {formData[data]?.options?.map((opt) => ({
                    ...(formData[data].default === opt.key ? (
                      <div key={opt.key}>
                        <input
                          name={data}
                          type="radio"
                          {...register(data)}
                          value={opt.key}
                          {...formData[data].html_attr}
                          {...(formData[data].required === true && {
                            required: true,
                          })}
                          {...(formData[data].readonly === true && {
                            readOnly: true,
                          })}
                          defaultChecked
                        />
                        <label
                          className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor={opt.key}
                        >
                          {opt.label}
                        </label>
                      </div>
                    ) : (
                      <div key={opt.key}>
                        <input
                          name={data}
                          type="radio"
                          {...register(data)}
                          value={opt.key}
                          {...formData[data].html_attr}
                          {...(formData[data].required === true && {
                            required: true,
                          })}
                          {...(formData[data].readonly === true && {
                            readOnly: true,
                          })}
                        />
                        <label
                          className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
                          htmlFor={opt.key}
                        >
                          {opt.label}
                        </label>
                      </div>
                    )),
                  }))}
                </>
              ) : formData[data].type === "textarea" ? (
                <textarea
                  value={formData[data].value}
                  name={data}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  {...register(data)}
                  placeholder={"Write your " + formData[data].title}
                  {...(formData[data].required === true && { required: true })}
                  {...(formData[data].readonly === true && { readOnly: true })}
                  {...formData[data].html_attr}

                  // {...(formData[data].type === 'select' && { type: formData[data].type })}
                />
              ) : (
                <input
                  value={formData[data].value}
                  name={data}
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  id="grid-first-name"
                  type="text"
                  {...register(data)}
                  placeholder={"Write your " + formData[data].title}
                  {...(formData[data].required === true && { required: true })}
                  {...(formData[data].readonly === true && { readOnly: true })}
                  {...formData[data].html_attr}
                  {...(formData[data].type && { type: formData[data].type })}
                  // {...(formData[data].type === 'select' && { type: formData[data].type })}
                />
              )}
            </div>
          </div>
        ))}
        <div className="flex items-center justify-between">
          <button
            className="ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
      {isConfirm === true ? (
        <div class="mt-3 bg-indigo-900 text-center py-4 lg:px-4">
          <div
            class="p-2 bg-green-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span class="flex rounded-full bg-green-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              {status.status}
            </span>
            <span class="font-semibold mr-2 text-left flex-auto">
              {status.messages && <p>{status.messages.join(`\r\n`)}</p>}
            </span>
            <svg
              class="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      ) : isConfirm === null ? (
        ""
      ) : (
        <div class="mt-3 bg-red-900 text-center py-4 lg:px-4">
          <div
            class="p-2 bg-red-800 items-center text-indigo-100 leading-none lg:rounded-full flex lg:inline-flex"
            role="alert"
          >
            <span class="flex rounded-full bg-red-500 uppercase px-2 py-1 text-xs font-bold mr-3">
              {status.status}
            </span>
            <span class="font-semibold mr-2 text-left flex-auto">
              {status.messages && <p>{status.messages.join(`\r\n`)}</p>}
            </span>
            <svg
              class="fill-current opacity-75 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpdateForm;
