import { useState } from 'react';
import { useWorkspace } from '../hooks/useWorkspace';
import Modal from '../../../shared/components/Modal/Modal';
import Input from '../../../shared/components/Input/Input';
import Button from '../../../shared/components/Button/Button';

const WorkspaceSetupModal = ({ isOpen }) => {
  const { handleCreateWorkspace, clearFieldError, fieldErrors, error, isLoading } = useWorkspace();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    clearFieldError(e.target.name);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleCreateWorkspace(formData);
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={() => {}} // Empty function prevents closing by clicking 'X' or outside
      title="Create Your First Workspace" 
      maxWidth="max-w-lg"
    >
      <div className="text-center mb-6">
        <h4 className="text-gray-900 text-lg font-medium mb-2">Welcome aboard! 🎉</h4>
        <p className="text-gray-500 text-sm">
          To get started, let's create a workspace for your team.
        </p>
      </div>

      {error && <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">{error}</div>}

      <form onSubmit={handleSubmit} noValidate>
        <Input
          label="Workspace Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={fieldErrors['name'] ? fieldErrors['name'][0] : undefined}
          placeholder="e.g. Acme Corp"
        />
        
        <Input
          label="Description (Optional)"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          error={fieldErrors['description'] ? fieldErrors['description'][0] : undefined}
          placeholder="What is this workspace for?"
        />

        <Button type="submit" className="mt-4" isLoading={isLoading}>
          {isLoading ? 'Creating...' : 'Create Workspace'}
        </Button>
      </form>
    </Modal>
  );
};

export default WorkspaceSetupModal;
