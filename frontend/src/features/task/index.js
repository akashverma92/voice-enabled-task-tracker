import React from 'react';

// Lazy load components
export const TaskBoard = React.lazy(() => import('./components/TaskBoard'));
export const TaskList = React.lazy(() => import('./components/TaskList'));
export const CreateTask = React.lazy(() => import('./components/CreateTask'));
export const EditTaskModal = React.lazy(() => import('./components/EditTaskModal'));
export const VoiceInput = React.lazy(() => import('./components/VoiceInput'));
export const TaskFilters = React.lazy(() => import('./components/TaskFilters'));

// Export hooks
export { useTaskDragAndDrop } from './hooks/useTaskDragAndDrop';
