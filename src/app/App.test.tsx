import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { routes } from './router';
import { renderWithRouter } from '../test-utils';

describe('App routes', () => {
  it('renders the homepage dream opening semantics', () => {
    renderWithRouter(routes);

    expect(screen.getAllByRole('heading', { name: /Amira Benbouali lucid portfolio foundation/i }).length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /Selected work/i })).toBeInTheDocument();
    expect(screen.getByText(/persistent WebGL canvas/i)).toBeInTheDocument();
  });

  it('allows the cinematic introduction to be skipped', () => {
    const scrollTo = vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined);
    renderWithRouter(routes);

    fireEvent.click(screen.getByRole('button', { name: 'Skip experience' }));

    expect(scrollTo).toHaveBeenCalled();
    scrollTo.mockRestore();
  });

  it('renders a project case study shell from project data', () => {
    renderWithRouter(routes, '/work/atria');

    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
    expect(screen.getByText(/calm planning environment/i)).toBeInTheDocument();
  });

  it('renders the writing journal index and an article page', () => {
    renderWithRouter(routes, '/writing');

    expect(screen.getByRole('heading', { name: 'Field Notes' })).toBeInTheDocument();
    expect(screen.getByText(/Thoughts on software, design and building things/i)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Why every calendar app overwhelms me/i })).toBeInTheDocument();
  });

  it('renders the about page as a reflective essay', () => {
    renderWithRouter(routes, '/about');

    expect(screen.getByRole('heading', { name: /making thought usable/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /The best engineering removes weight/i })).toBeInTheDocument();
    expect(screen.getByText(/Questions I keep returning to/i)).toBeInTheDocument();
  });
});
