import { useForm, SubmitHandler } from "react-hook-form";

interface Inputs {
  location: String,
  thoughts: String,
  reminders: String,
  unexpected: String,
  foresight: String,
}


export default function Home() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    console.log(data)
  }

  //const states = ["Clear", "Temperature", "Hydration", "Hunger", "Skin Health"]

  return (
    <div className="relative flex h-screen w-[95vw] flex-col md:items-left md:justify-center">

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl font-semibold">Add your notes here</h1>
        <div className="space-y-4">
          {
            /*
            <fieldset style={{float: 'left'}}>
            <legend>With the same name</legend>
            {
              states.map(
                (c,i) => <label key={c}><input type="checkbox" value={c} {...register()} />{c}</label>
              )
            }
          </fieldset>
            */
          }
          
          <p>Where are you?</p>
          <label className="inline-block w-full">
            <input
              {...register('location', { required: true })}
              placeholder="Enter Location"
              className="input"
            />
            {errors.location && (
              <p className="text-sm  text-orange-500">
                Please enter a valid location.
              </p>
            )}
          </label>
          <p>What are you currently doing? Thinking?</p>
          <label className="inline-block w-full">
            <textarea
              {...register('thoughts', { required: true })}
              className="input"
              placeholder='List a few thoughts'
            >
            </textarea>
            {errors.thoughts && (
              <p className="text-sm  text-orange-500">
                Please enter your thoughts.
              </p>
            )}
          </label>
          <p>How well are you doing on the reminders you set for yourself?</p>
          <label className="inline-block w-full">
            <textarea
              {...register('reminders', { required: true })}
              className="input"
              placeholder='I remembered to take Vitamins after lunch!'
            >
            </textarea>
            {errors.reminders && (
              <p className="text-sm  text-orange-500">
                Please reflect on your reminders.
              </p>
            )}
          </label>

          <p>What unexpected things happened?</p>
          <label className="inline-block w-full">
            <textarea
              {...register('unexpected', { required: true })}
              className="input"
              placeholder='Prepare for them next time.'
            >
            </textarea>
            {errors.unexpected && (
              <p className="text-sm  text-orange-500">
                Enter your response to unexpected.
              </p>
            )}
          </label>

          <p>What problems do you foresee?</p>
          <label className="inline-block w-full">
            <textarea
              {...register('foresight', { required: true })}
              className="input"
              placeholder='Any obstacles that would prevent scheduled things from happening?'
            >
            </textarea>
            {errors.foresight && (
              <p className="text-sm  text-orange-500">
                Predict something and plan it.
              </p>
            )}
          </label>
        </div>
        <button
          className="w-full rounded bg-[#E50914] py-3 font-semibold"
          type="submit"
        >
          Submit Note
        </button>
      </form>
    </div>
  )
}
