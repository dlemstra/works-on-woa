import "solid-js";
import { For, Match, Switch, createEffect, createResource } from "solid-js";

const getProject = async (result: any) => {
  return await result.data();
};

const Result = ({ result }: { result: any }) => {
  const [project] = createResource(result, getProject);

  createEffect(() => {
    console.log(project());
  });
  return (
    <a href={project()?.url} class="cursor-pointer">
      <li class="flex flex-row items-center bg-white bg-opacity-10 text-white rounded-md mb-2 no-underline">
        <div class="p-5">
          <img
            src={project()?.meta.image}
            width="50px"
            class="min-h-[50px] min-w-[50px]"
          />
        </div>
        <div class="border-l border-gray-500 basis-full">
          <h2 class="font-bold text-xl p-3 ">{project()?.meta.title}</h2>
          <div class="px-3 flex flex-col sm:flex-row gap-3 mb-3">
            <p>
              <b>Categories: </b>
              <span>{project()?.filters.categories.join(", ")}</span>
            </p>
            <p>
              <b>Compatibility: </b>
              <span>{project()?.filters.compatibility.join(", ")}</span>
            </p>
          </div>
        </div>
      </li>
    </a>
  );
};

const Results = ({ results, search, clearSearch }: any) => {
  createEffect(() => console.log(results(), search()));
  return (
    <Switch fallback={<></>}>
      <Match when={search().query.length > 0 && results.loading}>
        <div class="w-full flex flex-col items-center gap-3 p-10">
          Loading results...
        </div>
      </Match>
      <Match
        when={
          !search() ||
          !results() ||
          search().query.length === 0 ||
          results().results.length > 0
        }
      >
        <ul>
          <For each={results()?.results}>
            {(result) => <Result result={result} />}
          </For>
        </ul>
      </Match>
      <Match when={search().query.length > 0 && results().results.length === 0}>
        <div class="w-full flex flex-col items-center gap-3 p-10">
          No Results
          <button
            class="px-10 py-2 bg-white hover:bg-slate-300 border-white text-black font-bold border rounded-full"
            onClick={clearSearch}
          >
            Clear search
          </button>
        </div>
      </Match>
    </Switch>
  );
};

export default Results;
