import { TodosState, selectTodos, selectCurrentFilter, selectTodosEntities, getFilteredTodos } from './index';

import { Todos, Todo } from './todo/todo.model';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

describe('Selectors', () => {
  let adapter : EntityAdapter<Todo>;
  let initialState : any;
  let t: Array<Todo> = [
    { id: 1, text: 'Learn French', completed: false },
    { id: 2, text: 'Try Poutine', completed: true }
  ];

  beforeAll(() => {
    adapter = createEntityAdapter<Todo>();
    initialState = adapter.getInitialState();
  })

  describe('selectTodos', () => {
    it('should return todos', () => {
      const state: TodosState = {
        todos: initialState,
        currentFilter: "SHOW_ALL"
      }
      expect(selectTodos(state)).toEqual(initialState);
    })
  })

  describe('selectCurrentFilter', () => {
    it('should return current filter', () => {
      const state: TodosState = {
        todos: undefined,
        currentFilter: "SHOW_ALL"
      }
      expect(selectCurrentFilter(state)).toEqual("SHOW_ALL");
    })
  })

  describe('selectTodosEntities', () => {
    it('should return todos', () => {
      const todos = adapter.addOne(t[0], initialState);
      const state: TodosState = {
        todos,
        currentFilter: "SHOW_ALL"
      }
      expect(selectTodosEntities(state)).toEqual([t[0]]);
    })
  })

  describe('getFilteredTodos', () => {
    it('should return only active todos', () => {
      const todos = adapter.addMany(t, initialState);
      const state: TodosState = {
        todos,
        currentFilter: "SHOW_ACTIVE"
      }
      expect(getFilteredTodos(state)).toEqual([t[0]]);
    })
  })

})