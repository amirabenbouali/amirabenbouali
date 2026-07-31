import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { routes } from './router';
import { renderWithRouter } from '../test-utils';

describe('App routes', () => {
  it('renders the homepage dream opening semantics', () => {
    renderWithRouter(routes);

    expect(screen.getAllByRole('heading', { name: /everything begins as an unfinished thought/i }).length).toBeGreaterThan(
      0,
    );
    expect(screen.getByRole('heading', { name: /nothing is replaced\. everything transforms/i })).toBeInTheDocument();
    expect(screen.getAllByText(/Atria: time becomes architecture/i).length).toBeGreaterThan(0);
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
