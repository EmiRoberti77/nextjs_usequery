'use client';
import { useQuery, useIsFetching } from '@tanstack/react-query';
import { Todo, User } from '@/models/models';

const todosUrls = process.env.NEXT_PUBLIC_API_TODOS as string;
const usersUrls = process.env.NEXT_PUBLIC_API_USERS as string;

export default function Home() {
  const isFetching = useIsFetching();

  const {
    data: todosData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () =>
      fetch(todosUrls)
        .then((res) => res.json())
        .catch((err) => console.log(err)),
    select: (todos) =>
      todos.map((todo) => ({ id: todo.id, title: todo.title })), //create filter to select only relevant data
  });

  const { data: userData } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
      fetch(usersUrls)
        .then((res) => res.json())
        .catch((err) => console.log(err)),
    enabled: !!todosData,
  });

  if (isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        all queries are fetching ...
      </main>
    );
  }

  if (isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        there is a error
      </main>
    );
  }

  if (!isFetching) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-xl">To do</h1>
        <div className="flex flex-col gap-2">
          {todosData?.slice(0, 5).map((todo: Todo) => (
            <div className="flex" key={todo.id}>
              <h2>{todo.title}</h2>
            </div>
          ))}
        </div>
        <h1 className="text-xl mt-9">Users</h1>
        <div className="flex flex-col gap-2">
          {userData?.slice(0, 5).map((user: User) => (
            <div className="flex" key={user.id}>
              <h2>{user.name}</h2>
            </div>
          ))}
        </div>
      </main>
    );
  }
}
