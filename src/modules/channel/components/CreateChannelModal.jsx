import React, { useState } from 'react';
import Modal from '../../../shared/components/Modal/Modal';
import { useChannel } from '../hooks/useChannel';

const CreateChannelModal = ({ isOpen, onClose }) => {
  const { handleCreateChannel } = useChannel();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const resetForm = () => {
    setName('');
    setDescription('');
    setIsPrivate(false);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Backend expects: name, description (optional), is_private (optional)
      const data = {
        name: name.trim(),
        ...(description.trim() && { description: description.trim() }),
        is_private: isPrivate
      };

      const resultAction = await handleCreateChannel(data);
      if (resultAction?.error) {
        // Redux toolkit rejectWithValue payload usually ends up in action.payload
        const payload = resultAction.payload;
        if (typeof payload === 'object' && payload.name) {
          setError(payload.name[0]);
        } else if (typeof payload === 'object' && payload.description) {
          setError(payload.description[0]);
        } else {
          setError(payload?.message || 'Failed to create channel');
        }
      } else {
        handleClose();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title="Create a channel" maxWidth="max-w-md">
      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-3 rounded-lg border border-red-100">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-800" htmlFor="channelName">
            Name
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-medium">#</span>
            <input
              id="channelName"
              type="text"
              required
              maxLength={50}
              value={name}
              onChange={(e) => setName(e.target.value.toLowerCase().replace(/\s+/g, '-'))}
              placeholder="e.g. plan-budget"
              className="w-full pl-7 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Channels are where your team communicates. They're best when organized around a topic — #marketing, for example.
          </p>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm font-semibold text-gray-800" htmlFor="channelDescription">
            Description <span className="text-gray-400 font-normal">(optional)</span>
          </label>
          <input
            id="channelDescription"
            type="text"
            maxLength={255}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
          <p className="text-xs text-gray-500 mt-1">
            What's this channel about?
          </p>
        </div>

        <div className="flex items-start gap-3 mt-2">
          <div className="flex items-center h-5">
            <input
              id="isPrivate"
              type="checkbox"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="isPrivate" className="text-sm font-medium text-gray-900 cursor-pointer">
              Make private
            </label>
            <p className="text-xs text-gray-500">
              When a channel is set to private, it can only be viewed or joined by invitation.
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting || !name.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default CreateChannelModal;