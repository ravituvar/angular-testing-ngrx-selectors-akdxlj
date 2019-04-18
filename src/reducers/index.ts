import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { Todos, Todo } from './todo/todo.model';
import * as todos from './todo/todo.reducer';
import { Filter } from './currentFilter/currentFilter.model';
import * as currentFilter from './currentFilter/currentFilter.reducer';
import { select } from '@ngrx/store';
import { map } from 'rxjs/operators';
import * as todoEntity from './todo/todo.reducer';

export interface TodosState extends Todos, Filter { }

export const reducers: ActionReducerMap<TodosState> = {
  todos: todos.reducer,
  currentFilter: currentFilter.reducer
};

export const metaReducers: MetaReducer<TodosState>[] = [];

export const selectTodos = (state: TodosState) => state.todos;
export const selectCurrentFilter = (state: TodosState) => state.currentFilter;

export const selectTodosEntities = createSelector(
  selectTodos,
  todoEntity.selectAll
);

export const getFilteredTodos = createSelector(
  selectTodosEntities,
  selectCurrentFilter,
  getVisibleTodos
);

function getVisibleTodos(todos: Array<Todo>, filter: string) {
  console.log("Doing calculations...");
  debugger;
  if (!todos || !filter) return;
  let t = todos.slice().reverse();
  switch (filter) {
    case 'SHOW_ACTIVE':
      return t.filter(t => !t.completed);
    case 'SHOW_COMPLETED':
      return t.filter(t => t.completed);
    case 'SHOW_ALL':
    default:
      return t;
  }
};