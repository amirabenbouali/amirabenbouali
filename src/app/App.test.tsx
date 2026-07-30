import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { routes } from './router';
import { renderWithRouter } from '../test-utils';

describe('App routes', () => {
  it('renders the homepage observatory landing', () => {
    renderWithRouter(routes);

    expect(screen.getByRole('heading', { name: /i build software that feels quiet/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /enter the observatory/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /product engineering as quiet observation/i })).toBeInTheDocument();
  });

  it('renders a project case study shell from project data', () => {
    renderWithRouter(routes, '/work/atria');

    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
    expect(screen.getByText(/product systems/i)).toBeInTheDocument();
  });
});
