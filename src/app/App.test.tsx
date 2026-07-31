import { screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { routes } from './router';
import { renderWithRouter } from '../test-utils';

describe('App routes', () => {
  it('renders the homepage observatory landing', () => {
    renderWithRouter(routes);

    expect(screen.getByRole('heading', { name: /i build software that feels quiet/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /view selected work/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /field notes from the studio/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Foundry' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'amira@amirabenbouali.com' })).toBeInTheDocument();
  });

  it('renders a project case study shell from project data', () => {
    renderWithRouter(routes, '/work/atria');

    expect(screen.getByRole('heading', { name: 'Atria' })).toBeInTheDocument();
    expect(screen.getByText(/product systems/i)).toBeInTheDocument();
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
