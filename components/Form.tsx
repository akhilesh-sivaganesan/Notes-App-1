import { useForm, SubmitHandler } from "react-hook-form";
import Clock from 'react-live-clock'
import { Inputs, Snapshot } from '../typings'
import { useRecoilState, useRecoilValue } from "recoil"
import { snapshotListState, todoListState } from "../atoms/recoil_state";
import {useState, useEffect } from 'react';
export default function Form() {

  const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>();
  const [snapshotList, setSnapshotList] = useRecoilState<Snapshot[]>(snapshotListState);
  const todoList = useRecoilValue(todoListState)
  const onSubmit: SubmitHandler<Inputs> = async (data) => {    
    let snap = JSON.parse(JSON.stringify(data))
    snap.todoList = [...todoList]
    snap.time = new Date()
    setSnapshotList([...snapshotList, snap as Snapshot])
  }

  const states = ["Energized", "Clear-minded", "Hydrated", "Still", "Easy", "Physically Cool"]

  return (
    <div className="relative flex flex-col justify-start">

      <form
        className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className="text-4xl">Add your notes here</h1>
        <div className="space-y-4">
          {
            /*
            <div>
            <Clock
              format={'h:mm:ssa'}
              className="text-xl"
              ticking={true} />
          </div>
            */
          }

            <Clock
              format={'h:mm'}
              className="text-xl"
              ticking={true} />

          <fieldset>
            <legend>Check the states applicable to you</legend>
            {
              states.map(
                (c, i) => <div className="flex w-full items-center"><label key={i}><input className="mx-2" type="checkbox" value={c} {...register('states')} />{c}</label></div>
              )
            }
          </fieldset>

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
