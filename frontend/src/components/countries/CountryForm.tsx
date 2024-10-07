import React, { FormEvent, useState } from "react"
import {
  useAddCountryMutation,
  useGetAllContinentsQuery,
} from "@/generated/graphql-types"
import { GET_ALL_COUNTRIES } from "@/graphql/queries"

export default function CountryForm() {
  const [formError, setFormError] = useState<string | undefined>(undefined)
  const { data, loading } = useGetAllContinentsQuery()
  const [addNewCountry] = useAddCountryMutation()

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formJson = {
      name: formData.get("name") as string,
      emoji: formData.get("emoji") as string,
      code: formData.get("code") as string,
      continent: formData.get("continent") as unknown as number,
    }

    if (Object.keys(formJson).length < 4) {
      setFormError("Please fill every form input")
      return
    }

    setFormError(undefined)

    addNewCountry({
      variables: {
        data: {
          name: formJson.name,
          emoji: formJson.emoji,
          code: formJson.code,
          continent: {
            id: Number(formJson.continent),
          },
        },
      },
      onError(error) {
        setFormError(error.message)
      },
      onCompleted() {
        setFormError(undefined)
      },
      refetchQueries: [
        {
          query: GET_ALL_COUNTRIES,
        },
      ],
    })
  }

  return (
    <form
      onSubmit={(e) => onSubmit(e)}
      className="space-y-8 border-slate-200 border-[1px] rounded-md p-4 lg:space-y-4"
    >
      <div className="space-y-4 lg:flex lg:flex-row lg:justify-between lg:items-center lg:space-y-0 lg:space-x-4">
        <section className="flex flex-col items-start gap-2">
          <label>Name</label>
          <input
            placeholder="Example : France"
            type="text"
            name="name"
            className="border-[1px] border-slate-100 rounded-md p-2 w-full placeholder:italic"
          />
        </section>
        <section className="flex flex-col items-start gap-2">
          <label>Emoji</label>
          <input
            placeholder="Example : 🇫🇷"
            type="text"
            name="emoji"
            className="border-[1px] border-slate-100 rounded-md p-2 w-full placeholder:italic"
          />
        </section>
        <section className="flex flex-col items-start gap-2">
          <label>Code</label>
          <input
            placeholder="Example : FR"
            type="text"
            name="code"
            className="border-[1px] border-slate-100 rounded-md p-2 w-full placeholder:italic"
          />
        </section>
        <section className="flex flex-col items-start gap-2 lg:w-1/4">
          <label>Continent</label>
          <select
            placeholder="Example : Europa"
            name="continent"
            className="border-[1px] border-slate-100 rounded-md p-2 w-full"
          >
            <option value="">---</option>
            {loading ? (
              <option value="">Loading...</option>
            ) : (
              data &&
              data.continents.map((continent) => (
                <option key={continent.id} value={continent.id}>
                  {continent.name}
                </option>
              ))
            )}
          </select>
        </section>
      </div>
      {formError && <p className="mx-auto text-red-700">{formError}</p>}
      <button
        type="submit"
        className="bg-purple-400 p-2 rounded-md text-white font-bold w-full lg:h-full"
      >
        Add
      </button>
    </form>
  )
}
