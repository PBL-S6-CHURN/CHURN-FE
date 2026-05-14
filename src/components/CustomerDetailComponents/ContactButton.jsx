import { Icon } from '@iconify/react';
import React from 'react';

export default function ContactButton({ icon, label, onClick, color }) {
    return (
      <button className="contact-btn" onClick={onClick}>
        <Icon icon={icon} width="24" height="24" color={color} />
        {label}
      </button>
    );
  }