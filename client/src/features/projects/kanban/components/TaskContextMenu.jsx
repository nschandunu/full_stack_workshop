import { createPortal } from 'react-dom';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

const MENU_MARGIN = 12;

function TaskContextMenu({
  task,
  position,
  moveOptions = [],
  onClose,
  onEdit = () => {},
  onMove = () => {},
  onChangePriority = () => {},
  onDuplicate = () => {},
  onDelete = () => {},
}) {
  const menuRef = useRef(null);
  const [resolvedPosition, setResolvedPosition] = useState(position);

  useLayoutEffect(() => {
    const menuElement = menuRef.current;

    if (!menuElement) {
      return;
    }

    const menuRect = menuElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = position.x;
    let top = position.y;

    if (left + menuRect.width > viewportWidth - MENU_MARGIN) {
      left = position.x - menuRect.width;
    }

    if (top + menuRect.height > viewportHeight - MENU_MARGIN) {
      top = position.y - menuRect.height;
    }

    left = Math.max(MENU_MARGIN, Math.min(left, viewportWidth - menuRect.width - MENU_MARGIN));
    top = Math.max(MENU_MARGIN, Math.min(top, viewportHeight - menuRect.height - MENU_MARGIN));

    setResolvedPosition({ x: left, y: top });
  }, [position.x, position.y, task?.id, moveOptions.length]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const selectAction = (action) => {
    onClose();
    Promise.resolve(action()).catch(() => {});
  };

  const priorityOptions = ['low', 'medium', 'high'];

  return createPortal(
    <div
      ref={menuRef}
      className="kanban-context-menu"
      role="menu"
      aria-label={`Task actions for ${task.title}`}
      style={{
        position: 'fixed',
        left: `${resolvedPosition.x}px`,
        top: `${resolvedPosition.y}px`,
      }}
    >
      <div className="kanban-context-menu__section">
        <button type="button" className="kanban-context-menu__item" role="menuitem" onClick={() => selectAction(() => onEdit(task))}>
          Edit task
        </button>
      </div>

      <div className="kanban-context-menu__section">
        <p className="kanban-context-menu__label">Move to</p>
        {moveOptions.map((option) => (
          <button
            key={option.status}
            type="button"
            className="kanban-context-menu__item"
            role="menuitem"
            onClick={() => selectAction(() => onMove(task, option.status))}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className="kanban-context-menu__section">
        <p className="kanban-context-menu__label">Change priority</p>
        {priorityOptions.map((priority) => (
          <button
            key={priority}
            type="button"
            className="kanban-context-menu__item"
            role="menuitem"
            onClick={() => selectAction(() => onChangePriority(task, priority))}
          >
            {priority.charAt(0).toUpperCase() + priority.slice(1)}
          </button>
        ))}
      </div>

      <div className="kanban-context-menu__section kanban-context-menu__section--split">
        <button type="button" className="kanban-context-menu__item" role="menuitem" onClick={() => selectAction(() => onDuplicate(task))}>
          Duplicate task
        </button>
        <button type="button" className="kanban-context-menu__item kanban-context-menu__item--danger" role="menuitem" onClick={() => selectAction(() => onDelete(task))}>
          Delete task
        </button>
      </div>
    </div>,
    document.body,
  );
}

export default TaskContextMenu;
