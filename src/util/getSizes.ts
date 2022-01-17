export function getAvatarSize(size: string): string {
  if (size) {
    switch (size) {
      case 'xs':
        return '24px';
      case 'sm':
        return '32px';
      case 'md':
        return '40px';
      case 'lg':
        return '48px';
      case 'xl':
        return '56px';
      default:
        return '56px';
    }
  }
  return '56px';
}

export function getAvatarNotificationSize(size: string): string {
  if (size) {
    switch (size) {
      case 'xs':
        return '8px';
      case 'sm':
        return '10px';
      case 'md':
        return '12px';
      case 'lg':
        return '12px';
      case 'xl':
        return '14px';
      default:
        return '14px';
    }
  }
  return '14px';
}

export function getAvatarNotificationBorder(size: string): string {
  if (size) {
    switch (size) {
      case 'xs':
        return '1px';
      case 'sm':
        return '1px';
      case 'md':
        return '1.2px';
      case 'lg':
        return '1.4px';
      case 'xl':
        return '1.5px';
      default:
        return '1.5px';
    }
  }
  return '1.5px';
}
