'use client';
import React from 'react';
import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Todo } from '@/models/models';
import { error } from 'console';
const url = 'http://localhost:3001/todos';

const Todos = () => {
  const queryClient = useQueryClient();
  const {
    data: todosData,
    isError,
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => axios.get<Todo[]>(url).then((res) => res.data),
  });

  const mutation: any = useMutation<Todo>({
    mutationFn: (newTodo) => {
      return axios.post(url, newTodo);
    },
    onMutate: (variable) => {
      console.log('onMutate', 'a mutation is about to happen');
    },
    onError: (error, variable, context) => {
      console.log('error', error.message);
    },
    onSuccess: (data, variable, context) => {
      console.log('success', data);
      queryClient.invalidateQueries({
        queryKey: ['todos'],
      });
    },
  });

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      {mutation.isPending ? (
        'adding todo'
      ) : (
        <>
          {mutation.isError ? <div>error {mutation.error.message}</div> : null}
          {mutation.isSuccess ? <div>Todo added!</div> : null}
          <button
            onClick={() => {
              mutation.mutate({
                id: new Date().getMilliseconds(),
                title: 'go to gym',
              });
            }}
          >
            create new todo
          </button>
        </>
      )}
      <br />
      {isLoading ? (
        <div>loading</div>
      ) : (
        <>
          <h1 className="text-xl mt-9">List of todos</h1>
          <div className="flex flex-col gap-2">
            {todosData?.map((todo) => (
              <div className="flex" key={todo.id}>
                <h2>{todo.title}</h2>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Todos;
