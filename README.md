## Starting JSON-SERVER
This code is using json-server to emulate a database for the endpoin 
make sure that you also run the json-server on port:3001. I have left a command in the package.json

```bash
npm run json-server
```
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Enviroment variables - env.local
I have left env.local in the project so api_urls can be changed 

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## useQuery

this codebase is to demonstrate how to make use of useQuery and the queryTools and access data and mutatate when data changes

```bash
  const {
    data: todosData,
    isError,
    isLoading,
  } = useQuery<Todo[]>({
    queryKey: ['todos'],
    queryFn: () => axios.get<Todo[]>(url).then((res) => res.data),
  });
```
