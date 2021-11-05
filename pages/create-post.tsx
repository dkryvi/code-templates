import {yupResolver} from '@hookform/resolvers/yup'
import {NextSeo} from 'next-seo'
import Router from 'next/router'
import React from 'react'
import {useForm} from 'react-hook-form'
import toast from 'react-hot-toast'
import * as yup from 'yup'

import {client} from 'api/client'
import Container from 'components/container'
import Layout from 'components/layout'
import {useUser} from 'context/user'
import useAsync from 'hooks/use-async'
import {getErrorMessage} from 'utils/error'

const schema = yup
  .object({
    title: yup.string().min(3).max(30).required(),
    tags: yup.string().required(),
    ['coverImage']: yup
      .string()
      .url()
      .required('cover image is a required field'),
    ['socialImage']: yup
      .string()
      .url()
      .required('social image is a required field'),
    excerpt: yup.string().required(),
    content: yup.string().required()
  })
  .required()

const ErrorMessage: React.FC<{message?: string}> = ({message}) => {
  return <p className="prose prose-sm text-red-500">{message}</p>
}

const CreatePostPage: React.FC = () => {
  const {session} = useUser()
  const {run, isLoading, isSuccess, error} = useAsync()

  const {
    register,
    handleSubmit,
    formState: {errors}
  } = useForm({
    resolver: yupResolver(schema)
    // defaultValues: {
    //   title: 'Draft Title',
    //   tags: 'qwe, zxc',
    //   coverImage: 'https://google.com',
    //   socialImage: 'https://google.com',
    //   excerpt: 'excerpt',
    //   content: 'content'
    // }
  })

  const onSubmit = React.useCallback(
    async (data) => {
      run(
        client('/api/post', {
          headers: {
            token: session?.access_token
          },
          body: JSON.stringify(data)
        })
      )
    },
    [run, session?.access_token]
  )

  React.useEffect(() => {
    if (isSuccess) {
      toast.success('New post successfully created')
      Router.push('/posts')
    }
  }, [isSuccess])

  React.useEffect(() => {
    if (error) {
      const message = getErrorMessage(error)
      toast.error(message)
    }
  }, [error])

  return (
    <Layout>
      <NextSeo title="Create Post | Code Templates" />
      <Container>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h1 className="mb-6 prose text-6xl font-bold">New Post</h1>
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="title" className="label">
                Title
              </label>
              <input id="title" type="text" {...register('title')} />
              <ErrorMessage message={errors.title?.message} />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <input id="tags" type="text" {...register('tags')} />
              <ErrorMessage message={errors.tags?.message} />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="coverImage" className="label">
                Cover image URL
              </label>
              <input id="coverImage" type="url" {...register('coverImage')} />
              <ErrorMessage message={errors['coverImage']?.message} />
            </div>

            <div className="col-span-6 sm:col-span-3">
              <label htmlFor="socialImage" className="label">
                Social image URL
              </label>
              <input id="socialImage" type="url" {...register('socialImage')} />
              <ErrorMessage message={errors['socialImage']?.message} />
            </div>

            <div className="col-span-6">
              <label htmlFor="excerpt" className="label">
                Excerpt
              </label>
              <textarea id="excerpt" {...register('excerpt')} />
              <ErrorMessage message={errors.excerpt?.message} />
            </div>

            <div className="col-span-6">
              <label htmlFor="content" className="label">
                Content
              </label>
              <textarea id="content" {...register('content')} />
              <ErrorMessage message={errors.content?.message} />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mt-3 float-right"
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </Container>
    </Layout>
  )
}

export default CreatePostPage
