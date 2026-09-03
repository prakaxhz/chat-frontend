import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWorkspaces, createWorkspace, setActiveWorkspace, clearWorkspaceError, clearSpecificFieldError } from '../store/workspaceSlice';

export const useWorkspace = () => {
  const dispatch = useDispatch();
  const workspaceState = useSelector((state) => state.workspace);

  const loadWorkspaces = useCallback(async () => {
    return await dispatch(fetchWorkspaces());
  }, [dispatch]);

  const handleCreateWorkspace = useCallback(async (data) => {
    return await dispatch(createWorkspace(data));
  }, [dispatch]);

  const selectWorkspace = useCallback((workspace) => {
    dispatch(setActiveWorkspace(workspace));
  }, [dispatch]);

  const clearError = useCallback(() => {
    dispatch(clearWorkspaceError());
  }, [dispatch]);

  const clearFieldError = useCallback((field) => {
    dispatch(clearSpecificFieldError(field));
  }, [dispatch]);

  return {
    ...workspaceState,
    loadWorkspaces,
    handleCreateWorkspace,
    selectWorkspace,
    clearError,
    clearFieldError,
  };
};
