--
-- PostgreSQL database dump
--

\restrict IA7IbRgAhKQI0iseQJxGcfYIcVz4GcLhhfZPAQiYMZ2abApBd4a7ddIbgQXKyhO

-- Dumped from database version 16.15
-- Dumped by pg_dump version 16.15

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

ALTER TABLE IF EXISTS ONLY public.vocabularies DROP CONSTRAINT IF EXISTS vocabularies_created_by_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_vocabularies DROP CONSTRAINT IF EXISTS user_vocabularies_vocabulary_id_vocabularies_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_vocabularies DROP CONSTRAINT IF EXISTS user_vocabularies_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_progress DROP CONSTRAINT IF EXISTS user_progress_lesson_id_lessons_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_grammar_progress DROP CONSTRAINT IF EXISTS user_grammar_progress_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_grammar_progress DROP CONSTRAINT IF EXISTS user_grammar_progress_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_daily_activity DROP CONSTRAINT IF EXISTS user_daily_activity_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.user_achievements DROP CONSTRAINT IF EXISTS user_achievements_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.quiz_questions DROP CONSTRAINT IF EXISTS quiz_questions_quiz_id_quizzes_id_fk;
ALTER TABLE IF EXISTS ONLY public.quiz_attempts DROP CONSTRAINT IF EXISTS quiz_attempts_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.quiz_attempts DROP CONSTRAINT IF EXISTS quiz_attempts_quiz_id_quizzes_id_fk;
ALTER TABLE IF EXISTS ONLY public.quiz_answers DROP CONSTRAINT IF EXISTS quiz_answers_question_id_quiz_questions_id_fk;
ALTER TABLE IF EXISTS ONLY public.placement_test_questions DROP CONSTRAINT IF EXISTS placement_test_questions_placement_test_id_placement_tests_id_f;
ALTER TABLE IF EXISTS ONLY public.placement_test_attempts DROP CONSTRAINT IF EXISTS placement_test_attempts_user_id_users_id_fk;
ALTER TABLE IF EXISTS ONLY public.placement_test_attempts DROP CONSTRAINT IF EXISTS placement_test_attempts_placement_test_id_placement_tests_id_fk;
ALTER TABLE IF EXISTS ONLY public.listening_lessons DROP CONSTRAINT IF EXISTS listening_lessons_quiz_id_quizzes_id_fk;
ALTER TABLE IF EXISTS ONLY public.listening_lessons DROP CONSTRAINT IF EXISTS listening_lessons_course_id_courses_id_fk;
ALTER TABLE IF EXISTS ONLY public.lessons DROP CONSTRAINT IF EXISTS lessons_course_id_courses_id_fk;
ALTER TABLE IF EXISTS ONLY public.lesson_vocabularies DROP CONSTRAINT IF EXISTS lesson_vocabularies_vocabulary_id_vocabularies_id_fk;
ALTER TABLE IF EXISTS ONLY public.lesson_vocabularies DROP CONSTRAINT IF EXISTS lesson_vocabularies_lesson_id_lessons_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_topics DROP CONSTRAINT IF EXISTS grammar_topics_quiz_id_quizzes_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_topics DROP CONSTRAINT IF EXISTS grammar_topics_parent_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_topic_relations DROP CONSTRAINT IF EXISTS grammar_topic_relations_to_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_topic_relations DROP CONSTRAINT IF EXISTS grammar_topic_relations_from_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_rules DROP CONSTRAINT IF EXISTS grammar_rules_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_mistakes DROP CONSTRAINT IF EXISTS grammar_mistakes_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_lessons DROP CONSTRAINT IF EXISTS grammar_lessons_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_examples DROP CONSTRAINT IF EXISTS grammar_examples_topic_id_grammar_topics_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_examples DROP CONSTRAINT IF EXISTS grammar_examples_source_id_content_sources_id_fk;
ALTER TABLE IF EXISTS ONLY public.grammar_examples DROP CONSTRAINT IF EXISTS grammar_examples_rule_id_grammar_rules_id_fk;
ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS accounts_user_id_users_id_fk;
DROP INDEX IF EXISTS public.vocabularies_word_idx;
DROP INDEX IF EXISTS public.vocabularies_manual_word_creator_unique;
DROP INDEX IF EXISTS public.vocabularies_catalog_word_unique;
DROP INDEX IF EXISTS public.vocabularies_catalog_source_topic_idx;
DROP INDEX IF EXISTS public.vocabularies_catalog_source_idx;
DROP INDEX IF EXISTS public.user_vocabularies_user_pinned_idx;
DROP INDEX IF EXISTS public.user_vocabularies_user_learned_idx;
DROP INDEX IF EXISTS public.user_progress_user_status_idx;
DROP INDEX IF EXISTS public.user_grammar_progress_user_idx;
DROP INDEX IF EXISTS public.quiz_questions_quiz_idx;
DROP INDEX IF EXISTS public.quiz_attempts_user_completed_idx;
DROP INDEX IF EXISTS public.quiz_answers_question_idx;
DROP INDEX IF EXISTS public.lesson_vocabularies_lesson_idx;
DROP INDEX IF EXISTS public.grammar_topics_title_vi_trgm_idx;
DROP INDEX IF EXISTS public.grammar_topics_title_en_trgm_idx;
DROP INDEX IF EXISTS public.grammar_topics_summary_vi_trgm_idx;
DROP INDEX IF EXISTS public.grammar_topics_slug_idx;
DROP INDEX IF EXISTS public.grammar_topics_level_category_idx;
DROP INDEX IF EXISTS public.grammar_rules_topic_idx;
DROP INDEX IF EXISTS public.grammar_mistakes_topic_idx;
DROP INDEX IF EXISTS public.grammar_lessons_topic_status_idx;
DROP INDEX IF EXISTS public.grammar_examples_topic_idx;
DROP INDEX IF EXISTS public.grammar_examples_normalized_hash_idx;
ALTER TABLE IF EXISTS ONLY public.vocabularies DROP CONSTRAINT IF EXISTS vocabularies_pkey;
ALTER TABLE IF EXISTS ONLY public.verifications DROP CONSTRAINT IF EXISTS verifications_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.user_vocabularies DROP CONSTRAINT IF EXISTS user_vocabularies_user_vocab_unique;
ALTER TABLE IF EXISTS ONLY public.user_vocabularies DROP CONSTRAINT IF EXISTS user_vocabularies_pkey;
ALTER TABLE IF EXISTS ONLY public.user_progress DROP CONSTRAINT IF EXISTS user_progress_user_lesson_unique;
ALTER TABLE IF EXISTS ONLY public.user_progress DROP CONSTRAINT IF EXISTS user_progress_pkey;
ALTER TABLE IF EXISTS ONLY public.user_grammar_progress DROP CONSTRAINT IF EXISTS user_grammar_progress_user_id_topic_id_pk;
ALTER TABLE IF EXISTS ONLY public.user_daily_activity DROP CONSTRAINT IF EXISTS user_daily_activity_user_date_unique;
ALTER TABLE IF EXISTS ONLY public.user_daily_activity DROP CONSTRAINT IF EXISTS user_daily_activity_pkey;
ALTER TABLE IF EXISTS ONLY public.user_achievements DROP CONSTRAINT IF EXISTS user_achievements_user_key_unique;
ALTER TABLE IF EXISTS ONLY public.user_achievements DROP CONSTRAINT IF EXISTS user_achievements_pkey;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_token_unique;
ALTER TABLE IF EXISTS ONLY public.sessions DROP CONSTRAINT IF EXISTS sessions_pkey;
ALTER TABLE IF EXISTS ONLY public.quizzes DROP CONSTRAINT IF EXISTS quizzes_slug_unique;
ALTER TABLE IF EXISTS ONLY public.quizzes DROP CONSTRAINT IF EXISTS quizzes_pkey;
ALTER TABLE IF EXISTS ONLY public.quiz_questions DROP CONSTRAINT IF EXISTS quiz_questions_quiz_order_unique;
ALTER TABLE IF EXISTS ONLY public.quiz_questions DROP CONSTRAINT IF EXISTS quiz_questions_pkey;
ALTER TABLE IF EXISTS ONLY public.quiz_attempts DROP CONSTRAINT IF EXISTS quiz_attempts_pkey;
ALTER TABLE IF EXISTS ONLY public.quiz_answers DROP CONSTRAINT IF EXISTS quiz_answers_question_order_unique;
ALTER TABLE IF EXISTS ONLY public.quiz_answers DROP CONSTRAINT IF EXISTS quiz_answers_pkey;
ALTER TABLE IF EXISTS ONLY public.placement_tests DROP CONSTRAINT IF EXISTS placement_tests_slug_unique;
ALTER TABLE IF EXISTS ONLY public.placement_tests DROP CONSTRAINT IF EXISTS placement_tests_pkey;
ALTER TABLE IF EXISTS ONLY public.placement_test_questions DROP CONSTRAINT IF EXISTS placement_test_questions_test_order_unique;
ALTER TABLE IF EXISTS ONLY public.placement_test_questions DROP CONSTRAINT IF EXISTS placement_test_questions_pkey;
ALTER TABLE IF EXISTS ONLY public.placement_test_attempts DROP CONSTRAINT IF EXISTS placement_test_attempts_pkey;
ALTER TABLE IF EXISTS ONLY public.listening_lessons DROP CONSTRAINT IF EXISTS listening_lessons_slug_unique;
ALTER TABLE IF EXISTS ONLY public.listening_lessons DROP CONSTRAINT IF EXISTS listening_lessons_pkey;
ALTER TABLE IF EXISTS ONLY public.lessons DROP CONSTRAINT IF EXISTS lessons_slug_unique;
ALTER TABLE IF EXISTS ONLY public.lessons DROP CONSTRAINT IF EXISTS lessons_pkey;
ALTER TABLE IF EXISTS ONLY public.lessons DROP CONSTRAINT IF EXISTS lessons_course_order_unique;
ALTER TABLE IF EXISTS ONLY public.lesson_vocabularies DROP CONSTRAINT IF EXISTS lesson_vocabularies_pkey;
ALTER TABLE IF EXISTS ONLY public.lesson_vocabularies DROP CONSTRAINT IF EXISTS lesson_vocabularies_lesson_vocab_unique;
ALTER TABLE IF EXISTS ONLY public.grammar_topics DROP CONSTRAINT IF EXISTS grammar_topics_slug_unique;
ALTER TABLE IF EXISTS ONLY public.grammar_topics DROP CONSTRAINT IF EXISTS grammar_topics_pkey;
ALTER TABLE IF EXISTS ONLY public.grammar_topic_relations DROP CONSTRAINT IF EXISTS grammar_topic_relations_unique;
ALTER TABLE IF EXISTS ONLY public.grammar_topic_relations DROP CONSTRAINT IF EXISTS grammar_topic_relations_pkey;
ALTER TABLE IF EXISTS ONLY public.grammar_rules DROP CONSTRAINT IF EXISTS grammar_rules_pkey;
ALTER TABLE IF EXISTS ONLY public.grammar_mistakes DROP CONSTRAINT IF EXISTS grammar_mistakes_pkey;
ALTER TABLE IF EXISTS ONLY public.grammar_lessons DROP CONSTRAINT IF EXISTS grammar_lessons_topic_version_unique;
ALTER TABLE IF EXISTS ONLY public.grammar_lessons DROP CONSTRAINT IF EXISTS grammar_lessons_pkey;
ALTER TABLE IF EXISTS ONLY public.grammar_examples DROP CONSTRAINT IF EXISTS grammar_examples_pkey;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_slug_unique;
ALTER TABLE IF EXISTS ONLY public.courses DROP CONSTRAINT IF EXISTS courses_pkey;
ALTER TABLE IF EXISTS ONLY public.content_sources DROP CONSTRAINT IF EXISTS content_sources_pkey;
ALTER TABLE IF EXISTS ONLY public.accounts DROP CONSTRAINT IF EXISTS accounts_pkey;
ALTER TABLE IF EXISTS ONLY drizzle.__drizzle_migrations DROP CONSTRAINT IF EXISTS __drizzle_migrations_pkey;
ALTER TABLE IF EXISTS drizzle.__drizzle_migrations ALTER COLUMN id DROP DEFAULT;
DROP TABLE IF EXISTS public.vocabularies;
DROP TABLE IF EXISTS public.verifications;
DROP TABLE IF EXISTS public.users;
DROP TABLE IF EXISTS public.user_vocabularies;
DROP TABLE IF EXISTS public.user_progress;
DROP TABLE IF EXISTS public.user_grammar_progress;
DROP TABLE IF EXISTS public.user_daily_activity;
DROP TABLE IF EXISTS public.user_achievements;
DROP TABLE IF EXISTS public.sessions;
DROP TABLE IF EXISTS public.quizzes;
DROP TABLE IF EXISTS public.quiz_questions;
DROP TABLE IF EXISTS public.quiz_attempts;
DROP TABLE IF EXISTS public.quiz_answers;
DROP TABLE IF EXISTS public.placement_tests;
DROP TABLE IF EXISTS public.placement_test_questions;
DROP TABLE IF EXISTS public.placement_test_attempts;
DROP TABLE IF EXISTS public.listening_lessons;
DROP TABLE IF EXISTS public.lessons;
DROP TABLE IF EXISTS public.lesson_vocabularies;
DROP TABLE IF EXISTS public.grammar_topics;
DROP TABLE IF EXISTS public.grammar_topic_relations;
DROP TABLE IF EXISTS public.grammar_rules;
DROP TABLE IF EXISTS public.grammar_mistakes;
DROP TABLE IF EXISTS public.grammar_lessons;
DROP TABLE IF EXISTS public.grammar_examples;
DROP TABLE IF EXISTS public.courses;
DROP TABLE IF EXISTS public.content_sources;
DROP TABLE IF EXISTS public.accounts;
DROP SEQUENCE IF EXISTS drizzle.__drizzle_migrations_id_seq;
DROP TABLE IF EXISTS drizzle.__drizzle_migrations;
DROP TYPE IF EXISTS public.skill;
DROP TYPE IF EXISTS public.reveal_mode;
DROP TYPE IF EXISTS public.question_type;
DROP TYPE IF EXISTS public.progress_status;
DROP TYPE IF EXISTS public.part_of_speech;
DROP TYPE IF EXISTS public.grammar_relation_type;
DROP TYPE IF EXISTS public.grammar_content_status;
DROP TYPE IF EXISTS public.difficulty;
DROP TYPE IF EXISTS public.content_license_code;
DROP TYPE IF EXISTS public.cefr_level;
DROP EXTENSION IF EXISTS pg_trgm;
DROP SCHEMA IF EXISTS drizzle;
--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA drizzle;


--
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- Name: cefr_level; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.cefr_level AS ENUM (
    'A1',
    'A2',
    'B1',
    'B2',
    'C1'
);


--
-- Name: content_license_code; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.content_license_code AS ENUM (
    'PRODUCTION_ALLOWED',
    'ATTRIBUTION_REQUIRED',
    'RESEARCH_ONLY',
    'UNKNOWN',
    'DO_NOT_USE'
);


--
-- Name: difficulty; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.difficulty AS ENUM (
    'easy',
    'medium',
    'hard'
);


--
-- Name: grammar_content_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.grammar_content_status AS ENUM (
    'draft',
    'review',
    'published'
);


--
-- Name: grammar_relation_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.grammar_relation_type AS ENUM (
    'prerequisite',
    'related',
    'confused_with'
);


--
-- Name: part_of_speech; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.part_of_speech AS ENUM (
    'noun',
    'verb',
    'adjective',
    'adverb',
    'pronoun',
    'preposition',
    'conjunction',
    'interjection',
    'phrase',
    'phrasal_verb'
);


--
-- Name: progress_status; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.progress_status AS ENUM (
    'not_started',
    'in_progress',
    'completed'
);


--
-- Name: question_type; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.question_type AS ENUM (
    'multiple_choice',
    'true_false',
    'fill_blank'
);


--
-- Name: reveal_mode; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.reveal_mode AS ENUM (
    'immediate',
    'after_submit'
);


--
-- Name: skill; Type: TYPE; Schema: public; Owner: -
--

CREATE TYPE public.skill AS ENUM (
    'vocabulary',
    'grammar',
    'listening',
    'reading',
    'speaking'
);


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: -
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: -
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: -
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: accounts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.accounts (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    provider_id text NOT NULL,
    account_id text NOT NULL,
    access_token text,
    refresh_token text,
    id_token text,
    access_token_expires_at timestamp with time zone,
    refresh_token_expires_at timestamp with time zone,
    scope text,
    password text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: content_sources; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.content_sources (
    id uuid NOT NULL,
    name text NOT NULL,
    url text,
    license_code public.content_license_code NOT NULL,
    attribution_text text,
    source_version text,
    imported_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: courses; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.courses (
    id uuid NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    level public.cefr_level NOT NULL,
    category text NOT NULL,
    lesson_count integer DEFAULT 0 NOT NULL,
    estimated_minutes integer NOT NULL,
    cover_color text DEFAULT 'blue'::text NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: grammar_examples; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_examples (
    id uuid NOT NULL,
    topic_id uuid NOT NULL,
    rule_id uuid,
    sentence_en text NOT NULL,
    sentence_vi text NOT NULL,
    highlights jsonb DEFAULT '[]'::jsonb NOT NULL,
    cefr_level public.cefr_level NOT NULL,
    difficulty smallint DEFAULT 1 NOT NULL,
    source_id uuid,
    source_record_id text,
    normalized_hash text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT grammar_examples_difficulty_check CHECK (((difficulty >= 1) AND (difficulty <= 5)))
);


--
-- Name: grammar_lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_lessons (
    id uuid NOT NULL,
    topic_id uuid NOT NULL,
    version integer DEFAULT 1 NOT NULL,
    body jsonb NOT NULL,
    status public.grammar_content_status DEFAULT 'draft'::public.grammar_content_status NOT NULL,
    published_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: grammar_mistakes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_mistakes (
    id uuid NOT NULL,
    topic_id uuid NOT NULL,
    incorrect_sentence text NOT NULL,
    correct_sentence text NOT NULL,
    error_type text NOT NULL,
    explanation_vi text NOT NULL,
    severity smallint DEFAULT 1 NOT NULL,
    cefr_level public.cefr_level NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT grammar_mistakes_error_type_check CHECK ((error_type = ANY (ARRAY['article'::text, 'preposition'::text, 'verb_tense'::text, 'subject_verb_agreement'::text, 'plural'::text, 'pronoun'::text, 'word_form'::text, 'word_order'::text, 'modal'::text, 'conditional'::text, 'passive'::text, 'relative_clause'::text, 'gerund_infinitive'::text, 'other'::text]))),
    CONSTRAINT grammar_mistakes_severity_check CHECK (((severity >= 1) AND (severity <= 3)))
);


--
-- Name: grammar_rules; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_rules (
    id uuid NOT NULL,
    topic_id uuid NOT NULL,
    title_en text NOT NULL,
    title_vi text NOT NULL,
    pattern text NOT NULL,
    explanation_vi text NOT NULL,
    order_index integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: grammar_topic_relations; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_topic_relations (
    id uuid NOT NULL,
    from_topic_id uuid NOT NULL,
    to_topic_id uuid NOT NULL,
    relation_type public.grammar_relation_type NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT grammar_topic_relations_no_self CHECK ((from_topic_id <> to_topic_id))
);


--
-- Name: grammar_topics; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.grammar_topics (
    id uuid NOT NULL,
    slug text NOT NULL,
    level public.cefr_level NOT NULL,
    quiz_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    title_en text NOT NULL,
    title_vi text NOT NULL,
    category text NOT NULL,
    parent_id uuid,
    order_index integer DEFAULT 0 NOT NULL,
    summary_vi text NOT NULL,
    status public.grammar_content_status DEFAULT 'draft'::public.grammar_content_status NOT NULL,
    deleted_at timestamp with time zone,
    CONSTRAINT grammar_topics_category_check CHECK ((category = ANY (ARRAY['verb_tenses'::text, 'articles'::text, 'clauses'::text, 'modals'::text, 'prepositions'::text, 'other'::text])))
);


--
-- Name: lesson_vocabularies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lesson_vocabularies (
    id uuid NOT NULL,
    lesson_id uuid NOT NULL,
    vocabulary_id uuid NOT NULL,
    order_index integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.lessons (
    id uuid NOT NULL,
    course_id uuid NOT NULL,
    order_index integer NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    skill public.skill NOT NULL,
    estimated_minutes integer NOT NULL,
    content jsonb NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: listening_lessons; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.listening_lessons (
    id uuid NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    difficulty public.difficulty NOT NULL,
    duration_seconds integer NOT NULL,
    audio_url text NOT NULL,
    transcript text NOT NULL,
    quiz_id uuid,
    course_id uuid,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: placement_test_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.placement_test_attempts (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    placement_test_id uuid NOT NULL,
    score integer NOT NULL,
    estimated_level public.cefr_level NOT NULL,
    answers jsonb NOT NULL,
    started_at timestamp with time zone NOT NULL,
    completed_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: placement_test_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.placement_test_questions (
    id uuid NOT NULL,
    placement_test_id uuid NOT NULL,
    order_index integer NOT NULL,
    level public.cefr_level NOT NULL,
    type public.question_type NOT NULL,
    prompt text NOT NULL,
    options jsonb NOT NULL,
    explanation text NOT NULL,
    points integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: placement_tests; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.placement_tests (
    id uuid NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: quiz_answers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_answers (
    id uuid NOT NULL,
    question_id uuid NOT NULL,
    order_index integer NOT NULL,
    content text NOT NULL,
    is_correct boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: quiz_attempts; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_attempts (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    quiz_id uuid NOT NULL,
    score integer NOT NULL,
    total_questions integer NOT NULL,
    correct_count integer NOT NULL,
    time_spent_seconds integer NOT NULL,
    answers jsonb NOT NULL,
    started_at timestamp with time zone NOT NULL,
    completed_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: quiz_questions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quiz_questions (
    id uuid NOT NULL,
    quiz_id uuid NOT NULL,
    order_index integer NOT NULL,
    type public.question_type NOT NULL,
    prompt text NOT NULL,
    explanation text NOT NULL,
    points integer DEFAULT 1 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: quizzes; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.quizzes (
    id uuid NOT NULL,
    slug text NOT NULL,
    title text NOT NULL,
    description text NOT NULL,
    reveal_mode public.reveal_mode DEFAULT 'after_submit'::public.reveal_mode NOT NULL,
    pass_score integer DEFAULT 70 NOT NULL,
    time_limit_seconds integer,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: sessions; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.sessions (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    token text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    ip_address text,
    user_agent text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_achievements; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_achievements (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    achievement_key text NOT NULL,
    unlocked_at timestamp with time zone DEFAULT now() NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_daily_activity; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_daily_activity (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    activity_date date NOT NULL,
    minutes integer DEFAULT 0 NOT NULL,
    lessons_completed integer DEFAULT 0 NOT NULL,
    words_saved integer DEFAULT 0 NOT NULL,
    quizzes_completed integer DEFAULT 0 NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_grammar_progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_grammar_progress (
    user_id uuid NOT NULL,
    topic_id uuid NOT NULL,
    attempt_count integer DEFAULT 0 NOT NULL,
    correct_count integer DEFAULT 0 NOT NULL,
    mastery_score numeric(4,3) DEFAULT '0'::numeric NOT NULL,
    last_attempt_at timestamp with time zone,
    next_review_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT user_grammar_progress_mastery_check CHECK (((mastery_score >= (0)::numeric) AND (mastery_score <= (1)::numeric)))
);


--
-- Name: user_progress; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_progress (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    lesson_id uuid NOT NULL,
    status public.progress_status DEFAULT 'not_started'::public.progress_status NOT NULL,
    progress_percent integer DEFAULT 0 NOT NULL,
    completed_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: user_vocabularies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.user_vocabularies (
    id uuid NOT NULL,
    user_id uuid NOT NULL,
    vocabulary_id uuid NOT NULL,
    saved_at timestamp with time zone DEFAULT now() NOT NULL,
    is_learned boolean DEFAULT false NOT NULL,
    learned_at timestamp with time zone,
    last_reviewed_at timestamp with time zone,
    review_count integer DEFAULT 0 NOT NULL,
    next_review_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_pinned boolean DEFAULT false NOT NULL
);


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id uuid NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    email_verified boolean DEFAULT false NOT NULL,
    image text,
    cefr_level public.cefr_level,
    daily_goal_minutes integer DEFAULT 20 NOT NULL,
    preferred_learning_time text,
    timezone text DEFAULT 'Asia/Ho_Chi_Minh'::text NOT NULL,
    onboarded_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: verifications; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.verifications (
    id uuid NOT NULL,
    identifier text NOT NULL,
    value text NOT NULL,
    expires_at timestamp with time zone NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


--
-- Name: vocabularies; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.vocabularies (
    id uuid NOT NULL,
    word text NOT NULL,
    pronunciation text NOT NULL,
    phonetic text NOT NULL,
    part_of_speech public.part_of_speech NOT NULL,
    meaning text NOT NULL,
    example_sentence text NOT NULL,
    audio_url text,
    difficulty public.difficulty NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    is_manual boolean DEFAULT false NOT NULL,
    created_by_user_id uuid,
    catalog_source text,
    topic text,
    CONSTRAINT vocabularies_manual_creator_check CHECK ((((is_manual = false) AND (created_by_user_id IS NULL)) OR ((is_manual = true) AND (created_by_user_id IS NOT NULL))))
);


--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: -
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	00a3209c323ac79623d966c5fa0397081d7367360af4b2b9895d14a5ec058bc3	1789028112565
2	11d418fa200874163524e318d5b0d691daed84f44abb5bc1e4f38f8b976cf4c8	1789031901355
3	5c1bbf7fd718d7ba857085381cf75b76518c470df4800f08fa7b31eaaf991f87	1789445815009
4	3e340b7ed1671a1148209fefc439585b501818d3846cfc928683a978b8700c45	1789500000000
5	3ba7f0dc1aa34ec98a756298c688b16e25edf1165e6d31825b05b2cdd8454d9a	1789501000000
6	fca2b0de7cea536018139fc69783036f9dd225e2f1be427364a48866fdb8afd3	1789550000000
7	2942e67cdcc891e5ec1be731114fdb9fe7e36cd5f4941321b42d3bc4ac9bd233	1789560000000
8	3818d407614b1154b1e4135aace5b3de2212a3be104713044c9523fb9caf43dc	1789570000000
9	98914f2ba120451334c5acb28a0cbdb3bee11911ea18467d4709050432e513fb	1789580000000
\.


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.accounts (id, user_id, provider_id, account_id, access_token, refresh_token, id_token, access_token_expires_at, refresh_token_expires_at, scope, password, created_at, updated_at) FROM stdin;
01a0a3b9-783c-7285-8ba7-4b371275d1ac	01a0a3b9-7821-7357-9b65-af7f4ca1999b	credential	01a0a3b9-7821-7357-9b65-af7f4ca1999b	\N	\N	\N	\N	\N	\N	66f79a658fc174e2fc2089fc58c7a3de:a9f431ce9a936432dc7d460b0460eec08a5923ac0c8c4ef6d269c2943bb7f79d6bcc41e0b9ab4f125f8e6666b373e2e1cc6965e49fde89d0fbac9d6717ef4860	2026-09-15 06:20:36.283+00	2026-09-15 06:20:36.283+00
01a0a81a-01fe-71ec-a81a-4f30269af998	01a0a81a-01f0-7063-94bc-c7e91d8f52d0	credential	01a0a81a-01f0-7063-94bc-c7e91d8f52d0	\N	\N	\N	\N	\N	\N	33357e0b9bba9be2c40b188edd8e8b27:7e08dc017edf6f91a249386f5845927ed3348f94e88ac127f0bc69c158e3ce3c88bd724fe45de5436ec22a695b8c1f93dc782b662bd1b2d0ae2b5deafb6dc9c2	2026-09-16 02:44:31.869+00	2026-09-16 02:44:31.869+00
01a0a81a-9c74-738f-b35e-6141ae23cc1d	01a0a81a-9c2e-76b8-9a53-1ed8c8841d7d	credential	01a0a81a-9c2e-76b8-9a53-1ed8c8841d7d	\N	\N	\N	\N	\N	\N	5a610466d1c009d6d795bc4ad409cc72:0dc17e65e60e4c45a327b589b19e7440eb4198c84a54e4ba633de88f6008deda58d5b9a3ec4c2e47d47536a65502d8f77bdc4d09349ddd520d17492b8b9bf9b8	2026-09-16 02:45:11.411+00	2026-09-16 02:45:11.411+00
01a0a81b-9fbd-71b5-a460-00f0ff1fd48e	01a0a81b-9fac-74eb-9bd9-6f1435dd56e5	credential	01a0a81b-9fac-74eb-9bd9-6f1435dd56e5	\N	\N	\N	\N	\N	\N	af8575c28175d2e4bdca3ff9eab619c6:c0b393b6e780d139a57c6bc5c3fd08799ffe80baadcea8e2a1f52d642a9597c229c3b6821efc2c08999028d7e49608fbacbb75d61a878197575c9ffb911ee500	2026-09-16 02:46:17.788+00	2026-09-16 02:46:17.788+00
01a0a81c-eeea-7015-9554-64ffc6bf5cd6	01a0a81c-eed9-7564-b14a-d31e1578bdb7	credential	01a0a81c-eed9-7564-b14a-d31e1578bdb7	\N	\N	\N	\N	\N	\N	a41bd1a171175117a6ae56f3073ec0a0:28b583ff826128a54da0acfd7a9de2aef7b9ad267fbe05a73620aca9e8ceafc647209fdf9f2959d57f38c846cd494f57b7a27f419e98a012aeb472ee8ac5c188	2026-09-16 02:47:43.594+00	2026-09-16 02:47:43.594+00
01a0a81d-347a-7229-ab88-09a5b0134d53	01a0a81d-3446-747e-99f8-685c3e2eadc0	credential	01a0a81d-3446-747e-99f8-685c3e2eadc0	\N	\N	\N	\N	\N	\N	904b6e113b4c815c3c563527fbf0a885:6e757aa0dfa200283a8f4293d826b303160601baff3c05d2541ac3a097a8673587cb67f3602930ef8e9e60c08fd2b921403d8fb89acb5aa94df1ba9e967eb20f	2026-09-16 02:48:01.402+00	2026-09-16 02:48:01.402+00
01a0a81d-a9f9-77b3-b9a3-b8b4404edd08	01a0a81d-a9d9-7628-858c-7df9026379b6	credential	01a0a81d-a9d9-7628-858c-7df9026379b6	\N	\N	\N	\N	\N	\N	a0db6e951b9ef31741f7b14db2c1b62b:57fb2b7c3c400f7f9af113fa1167e6db4dbd9959920ce7eb546a1dc9acb76d07139584daafe32e24152db351d18a7ecfc04b1f278327d0ff68faac3c4daa91c3	2026-09-16 02:48:31.48+00	2026-09-16 02:48:31.48+00
01a0a81f-8030-7744-8737-76a1b9d40190	01a0a81f-7e75-73ec-9081-3c5b2bec9caf	credential	01a0a81f-7e75-73ec-9081-3c5b2bec9caf	\N	\N	\N	\N	\N	\N	64283a19828dac04600a0317053e2b2d:79c68e0c3d56e67c2e80bf623227f20e09a7a1edd9eb4d5d2527e5fdcce71e6c2da437aa9265bf9c88c014a8b5a6406017dcddf9de556b99139ac1c6c9de654c	2026-09-16 02:50:31.855+00	2026-09-16 02:50:31.855+00
01a0a91c-868f-76e6-917d-5a4e6a2a5685	01a0a91c-8681-77b9-9899-98e3cd8c3983	credential	01a0a91c-8681-77b9-9899-98e3cd8c3983	\N	\N	\N	\N	\N	\N	6e9a08319df7070d51468e3ce9713d7a:4626223004786a4170764c7a548623c96750222b0e736d4dd6ced5954dfb1930bc2dcac5c5948d3e2e2c8dcbfc828608fdbb51331d560abdcbb99510705d9afc	2026-09-16 07:26:54.095+00	2026-09-16 07:26:54.095+00
01a0a91d-82e1-7402-b8c1-f87c78a1028a	01a0a91d-82d8-71df-94ae-8ce6b435f90a	credential	01a0a91d-82d8-71df-94ae-8ce6b435f90a	\N	\N	\N	\N	\N	\N	2e5eec5d410ca4c5bac79ba17e5608e5:f4a6fe07eaed806d1210a99e2067aa0fb3e1826137f129a0d3daef0640e85932249589910e56383121c9b955ba6bc286cd903d9b3751fe510639fe559b6590e4	2026-09-16 07:27:58.689+00	2026-09-16 07:27:58.689+00
\.


--
-- Data for Name: content_sources; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.content_sources (id, name, url, license_code, attribution_text, source_version, imported_at, created_at, updated_at) FROM stdin;
01a0a913-7a08-7518-be58-eb9385c0bf9d	CEFR-J Grammar Profile	https://www.cefr-j.org/download.html	ATTRIBUTION_REQUIRED	Curriculum map / CEFR levels informed by the CEFR-J Grammar Profile (Tono Lab, Tokyo University of Foreign Studies; also Open Language Profiles olp-en-cefrj). Research and commercial use permitted with proper citation. https://www.cefr-j.org/download.html	CEFR-J Grammar Profile (OLP mirror)	2026-09-16 07:17:01.071938+00	2026-09-16 07:17:01.071938+00	2026-09-17 09:53:19.862+00
01a0a913-7a1b-7116-a21a-1a9f18643d56	Tatoeba	https://tatoeba.org/en/downloads	ATTRIBUTION_REQUIRED	Example sentence text from Tatoeba (https://tatoeba.org), licensed under CC BY 2.0 FR. Audio not used.	text-only CC BY 2.0 FR	2026-09-16 07:17:01.084432+00	2026-09-16 07:17:01.084432+00	2026-09-17 09:53:19.883+00
01a0a913-7a29-756b-951f-0aeeaa19eb9f	TALPCo	https://github.com/matbahasa/TALPCo	ATTRIBUTION_REQUIRED	Example sentence pairs from TALPCo (TUFS Asian Language Parallel Corpus), licensed under CC BY 4.0. Nomoto et al. https://github.com/matbahasa/TALPCo	CC BY 4.0	2026-09-16 07:17:01.098009+00	2026-09-16 07:17:01.098009+00	2026-09-17 09:53:19.899+00
01a0ae7e-7538-711b-a20e-3f54a1b2811e	TOEIC Service List (TSL) 1.1	https://www.newgeneralservicelist.org/new-general-service-list-project-20	ATTRIBUTION_REQUIRED	Lemma selection based on the TOEIC Service List (TSL) 1.1 by Browne, C. & Culligan, B. (2016), licensed under CC BY-SA 4.0. Cite: Browne, C., and Culligan, B. (2016). The TOEIC Service List. Retrieved from http://www.newgeneralservicelist.org. Vietnamese meanings, IPA, pronunciation spellings, and example sentences are EnglishFlow originals.	TSL 1.1	2026-09-17 08:31:58.26515+00	2026-09-17 08:31:58.26515+00	2026-09-17 09:53:17.115+00
01a0a478-3755-73b5-91ab-357274728de5	EnglishFlow original	\N	PRODUCTION_ALLOWED	\N	phase-17	2026-09-15 09:48:57.046303+00	2026-09-15 09:48:57.046303+00	2026-09-17 09:53:19.839+00
\.


--
-- Data for Name: courses; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.courses (id, slug, title, description, level, category, lesson_count, estimated_minutes, cover_color, sort_order, created_at, updated_at) FROM stdin;
01a0a2d1-2359-71bd-bf1c-d44dc1857384	everyday-english	Everyday English	Build a strong foundation with the words and phrases you use every single day — routines, home, and food.	A1	Everyday Life	5	54	sky	1	2026-09-15 02:06:50.20291+00	2026-09-17 09:53:25.826+00
01a0a2d1-235f-7781-bc24-29ad9c00396f	english-conversation	English Conversation	Speak more naturally in everyday conversations — share opinions, express feelings, and keep a conversation flowing.	A2	Conversation	5	52	violet	2	2026-09-15 02:06:50.209314+00	2026-09-17 09:53:25.848+00
01a0a2d1-2365-7375-b42b-311e7131a885	english-for-travel	English for Travel	Everything you need to fly, check in, get around, and shop confidently in English.	A2	Travel	5	52	amber	3	2026-09-15 02:06:50.214259+00	2026-09-17 09:53:25.858+00
01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	essential-grammar	Essential Grammar	Master the core tenses and structures every intermediate learner needs.	B1	Grammar	5	72	emerald	4	2026-09-15 02:06:50.218804+00	2026-09-17 09:53:25.871+00
01a0a2d1-236e-72c2-a4d1-224a81b7122d	academic-english	Academic English	Formal vocabulary and structures for lectures, essays and research writing.	B2	Academic	5	61	rose	5	2026-09-15 02:06:50.223351+00	2026-09-17 09:53:25.886+00
\.


--
-- Data for Name: grammar_examples; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_examples (id, topic_id, rule_id, sentence_en, sentence_vi, highlights, cefr_level, difficulty, source_id, source_record_id, normalized_hash, created_at, updated_at) FROM stdin;
01a0a478-38c6-75d3-8d99-4f0fefa2a5d1	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a478-38ac-752f-b640-bc00c08bed2b	Did you watch the match last night?	Tối qua bạn có xem trận đấu không?	[{"text": "Did you watch", "type": "grammar"}, {"text": "last night", "type": "signal"}]	A2	2	01a0a478-3755-73b5-91ab-357274728de5	\N	726531c77555707ff0ef3ce7b04e2b82069b82ead1bf1816da0c88400253eb34	2026-09-15 09:48:57.415351+00	2026-09-17 09:53:20.584+00
01a0a478-3941-736c-b4c6-6744a9c9fccc	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	01a0a478-3934-76e1-82d6-18f1242ba026	I have never eaten sushi.	Tôi chưa từng ăn sushi.	[{"text": "have never eaten", "type": "grammar"}, {"text": "never", "type": "signal"}]	B1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	33d71e8c18af01344ebe29789b070a3d5f1ba0422583d0edbc2b307adb04fc9b	2026-09-15 09:48:57.538473+00	2026-09-17 09:53:20.816+00
01a0a913-7df4-7755-bf45-bbe1052fcce2	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	01a0a913-7dda-7618-92a5-750e19f8f138	There is a book on the desk.	Trên bàn có quyển sách.	[{"text": "a book", "type": "grammar"}, {"text": "the desk", "type": "grammar"}]	A1	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1244	7feb714e08ed09640799522c856fac9bd618d937648d79f05d28daed9e227a38	2026-09-16 07:17:02.069239+00	2026-09-17 09:53:21.196+00
01a0a913-7e02-74a7-9014-71be72db9eea	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	01a0a913-7dda-7618-92a5-750e19f8f138	She bought an umbrella, and the umbrella is red.	Cô ấy mua một chiếc ô, và chiếc ô đó màu đỏ.	[{"text": "an umbrella", "type": "grammar"}, {"text": "the umbrella", "type": "grammar"}]	A1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	de5c2e37174bb4c7643fcc579edb16ebbcb6e3d0d69c09339b573055e7449d5e	2026-09-16 07:17:02.082786+00	2026-09-17 09:53:21.208+00
01a0a913-7ed6-741e-b965-8823bc883350	01a0a913-7ea1-7118-becd-d45626898a5b	01a0a913-7ec9-70ba-b384-cad1671288d7	I am reading a book now.	Tôi đang đọc một cuốn sách.	[{"text": "am reading", "type": "grammar"}, {"text": "now", "type": "signal"}]	A1	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	257629	395db96cd947b593f70cc71b85da945411ac402f88f74a923b1434adcc8f88a6	2026-09-16 07:17:02.295533+00	2026-09-17 09:53:21.563+00
01a0a913-7ee3-706a-aaff-f37925ff6443	01a0a913-7ea1-7118-becd-d45626898a5b	01a0a913-7ebc-7517-b165-3454be64e2ea	The sun is rising.	Mặt trời đang lên.	[{"text": "is rising", "type": "grammar"}]	A1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	281049	d747b263e47228f9b528cbf98b89b84a7cc9d90985c6b17344e8b7c31a085870	2026-09-16 07:17:02.308311+00	2026-09-17 09:53:21.588+00
01a0a478-3808-77ba-8957-578fcce1c431	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a478-37f3-7505-8ebc-3f5753b52bd7	I study English every day.	Tôi học tiếng Anh mỗi ngày.	[{"text": "study", "type": "grammar"}, {"text": "every day", "type": "signal"}]	A1	1	01a0a478-3755-73b5-91ab-357274728de5	\N	8baa8c91e3e535dbbdc7dc9b1a9e99f4a4ec8de83df5186d1707bb8bb909a7f4	2026-09-15 09:48:57.22541+00	2026-09-17 09:53:20.238+00
01a0a478-3810-777c-9bee-04bbc92572fa	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a478-37f3-7505-8ebc-3f5753b52bd7	She works at a hospital.	Cô ấy làm việc ở bệnh viện.	[{"text": "works", "type": "grammar"}]	A1	1	01a0a478-3755-73b5-91ab-357274728de5	\N	a107825e2de8367a407a766d4e65ff5d96604dd24bd52ef939b0455358a92501	2026-09-15 09:48:57.233095+00	2026-09-17 09:53:20.254+00
01a0a478-381d-71af-8100-205c23b1b44a	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a478-37f3-7505-8ebc-3f5753b52bd7	Water boils at 100 degrees Celsius.	Nước sôi ở 100 độ C.	[{"text": "boils", "type": "grammar"}]	A1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	3db0aaa92554f78e4ed8a2f1284e32e60b669b136e3c9c7d6f6142ebb7dcde92	2026-09-15 09:48:57.246096+00	2026-09-17 09:53:20.28+00
01a0a478-3824-70a2-a1b5-c23b1f281344	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a478-37fa-7406-be9e-2fdaf54222f1	They don't eat meat.	Họ không ăn thịt.	[{"text": "don't eat", "type": "grammar"}]	A1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	f7b9921a8bbe80c468e79bce1e26a328d82a5f83ffc5afe276d842d8d76462f5	2026-09-15 09:48:57.252887+00	2026-09-17 09:53:20.303+00
01a0a478-38b3-76a7-9e8c-29c99b0203b7	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a478-38a0-7090-b691-6fa5a1df829a	I visited my grandparents last weekend.	Cuối tuần trước tôi đã thăm ông bà.	[{"text": "visited", "type": "grammar"}, {"text": "last weekend", "type": "signal"}]	A2	1	01a0a478-3755-73b5-91ab-357274728de5	\N	2678fc767ddd794e5ed5b25ca26df44fdf0dda8c9c71a2eef2df28fb78e72f85	2026-09-15 09:48:57.395888+00	2026-09-17 09:53:20.548+00
01a0a478-3948-7008-948a-99c1bcd8f970	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	01a0a478-3934-76e1-82d6-18f1242ba026	She has already finished her homework.	Cô ấy đã làm xong bài tập rồi.	[{"text": "has already finished", "type": "grammar"}, {"text": "already", "type": "signal"}]	B1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	f911e9e52ee7e5f6681ce9569230e3afbf709167ec48b4c2dd0dcfbc5a44b68a	2026-09-15 09:48:57.544602+00	2026-09-17 09:53:20.838+00
01a0a478-394e-77bc-93f8-e114dd4ea0ff	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	01a0a478-3934-76e1-82d6-18f1242ba026	Have you ever been to Hanoi?	Bạn đã từng đến Hà Nội chưa?	[{"text": "Have you ever been", "type": "grammar"}, {"text": "ever", "type": "signal"}]	B1	3	01a0a478-3755-73b5-91ab-357274728de5	\N	05d404f1cea6cf6b53f499e730b50084b2593ddc28c6b390fa485b9895036b96	2026-09-15 09:48:57.556761+00	2026-09-17 09:53:20.853+00
01a0a913-7de7-77de-af7e-55e517da405a	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	01a0a913-7dcc-74c7-8e8e-cc5038a3d7a6	My father is a teacher.	Bố tôi là giáo viên.	[{"text": "a teacher", "type": "grammar"}]	A1	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1178	5bf49c1f3efdf0c249e8df86e17c6ed0e3d18e2ee37ac63b5c6ea47c2b612027	2026-09-16 07:17:02.055842+00	2026-09-17 09:53:21.172+00
01a0a478-38b9-739e-847d-e4b401a78d0c	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a478-38ac-752f-b640-bc00c08bed2b	She didn't go to school yesterday.	Hôm qua cô ấy không đến trường.	[{"text": "didn't go", "type": "grammar"}, {"text": "yesterday", "type": "signal"}]	A2	2	01a0a478-3755-73b5-91ab-357274728de5	\N	db926b50c0ca616ce8b6e7fece749331deef0588e55edc55f22ee2203c35c876	2026-09-15 09:48:57.402585+00	2026-09-17 09:53:20.568+00
01a0a913-7ee9-7512-b6b5-dd4f68d051f4	01a0a913-7ea1-7118-becd-d45626898a5b	01a0a913-7ec9-70ba-b384-cad1671288d7	She is staying with her aunt this week.	Tuần này cô ấy đang ở cùng dì.	[{"text": "is staying", "type": "grammar"}, {"text": "this week", "type": "signal"}]	A1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	dbae4ad421864c21da044a476bc8577ef4062d9d1cf2df669d1de2b4a5c35fd5	2026-09-16 07:17:02.320605+00	2026-09-17 09:53:21.613+00
01a0a913-80f0-70aa-b518-2652c60d5441	01a0a913-80a5-72b5-9331-8c651514ab62	01a0a913-80bf-721e-9a0d-67d4d700c16f	I will go home.	Tôi sẽ về nhà.	[{"text": "will go", "type": "grammar"}]	A2	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1367	f23e0802493f89a46bd0263c2b514bb5443638597f15208220f88b3675134553	2026-09-16 07:17:02.83357+00	2026-09-17 09:53:22.323+00
01a0a913-81d9-768c-ac04-2bee7ee37adc	01a0a913-81a6-7658-91c8-f2b85c920739	01a0a913-81c0-71fb-8133-27e417f4dc55	Can you swim?	Bạn có biết bơi không?	[{"text": "Can you swim", "type": "grammar"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	16300	3597163338fde75afba4cc475ea49562c28e0f38699bbf5e9691e7a65e434ea0	2026-09-16 07:17:03.065958+00	2026-09-17 09:53:22.653+00
01a0a913-81e5-741e-8739-aca69203754e	01a0a913-81a6-7658-91c8-f2b85c920739	01a0a913-81cc-7031-9345-93f205212c60	We can study here.	Có thể học bài ở đây.	[{"text": "can study", "type": "grammar"}]	A2	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1474	b661947a2f87152bbaedcad6c301ec7313d2db5e234b1e929d330f267285a213	2026-09-16 07:17:03.078032+00	2026-09-17 09:53:22.679+00
01a0a913-81f0-7731-8777-34b52ad316ea	01a0a913-81a6-7658-91c8-f2b85c920739	01a0a913-81c0-71fb-8133-27e417f4dc55	Mr Tanaka can play tennis.	Anh Tanaka có thể chơi ten-nít.	[{"text": "can play", "type": "grammar"}]	A2	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1881	7a335fd05bb53080de0d15dd3b22e2003ee11c68132ead42d5efadbc66316417	2026-09-16 07:17:03.089466+00	2026-09-17 09:53:22.702+00
01a0a913-82dd-7380-9bf0-7262897919c0	01a0a913-82ab-74cc-9a37-de2a25e7cea7	01a0a913-82c4-715c-bbb6-adf5d2dda7b0	Dogs are bigger than cats.	Những con chó bự hơn những con mèo.	[{"text": "bigger", "type": "grammar"}, {"text": "than", "type": "signal"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	13097356	c82e8afcb905c6b4ed9466d193c4029774105ad82dfea47a42de5cb9b1e528fb	2026-09-16 07:17:03.331982+00	2026-09-17 09:53:23.046+00
01a0a913-82f1-748f-a125-ceb8324eb909	01a0a913-82ab-74cc-9a37-de2a25e7cea7	01a0a913-82d0-7479-89dc-f45b0b5dcecb	Love is the most beautiful feeling.	Tình yêu là cảm xúc đẹp đẽ nhất.	[{"text": "the most beautiful", "type": "grammar"}]	A2	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	14026834	2a14468bd0f3cee362d8a582552b2781be1c3940f38a7d8522cec4669bcb465e	2026-09-16 07:17:03.345846+00	2026-09-17 09:53:23.071+00
01a0a913-82ff-71e7-ac07-8c76d425c8bc	01a0a913-82ab-74cc-9a37-de2a25e7cea7	01a0a913-82c4-715c-bbb6-adf5d2dda7b0	This exercise is easier than the last one.	Bài tập này dễ hơn bài trước.	[{"text": "easier", "type": "grammar"}, {"text": "than", "type": "signal"}]	A2	2	01a0a478-3755-73b5-91ab-357274728de5	\N	41025800975b63764fd90e4cbab9a07cdfd9268a65533d5d24e485ed9e90df4e	2026-09-16 07:17:03.359627+00	2026-09-17 09:53:23.096+00
01a0a913-83f4-763b-8884-b6e82f05b853	01a0a913-83b8-71cc-92e0-59a0e7c85106	01a0a913-83d9-72cb-b736-19d0e177f1d1	I work in the morning.	Tôi làm việc vào buổi sáng.	[{"text": "in the morning", "type": "grammar"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	455783	43390f189d779a123ae92a3e53e5570f81b9c9c9ee8def0ec57981c6daa6de6d	2026-09-16 07:17:03.604612+00	2026-09-17 09:53:23.497+00
01a0a913-8400-74a0-9743-3169a464898f	01a0a913-83b8-71cc-92e0-59a0e7c85106	01a0a913-83e6-72b1-8f19-7edc292c5375	I met him at the station.	Tôi đã gặp anh ấy ở nhà ga.	[{"text": "at the station", "type": "grammar"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	260346	5db822fe1044a85186899749c63baea81b2ea14587fae3d59e041e4fff3b024f	2026-09-16 07:17:03.617304+00	2026-09-17 09:53:23.534+00
01a0a913-840b-7401-8594-f8059bd08552	01a0a913-83b8-71cc-92e0-59a0e7c85106	01a0a913-83e6-72b1-8f19-7edc292c5375	There is a book on the desk.	Trên bàn có quyển sách.	[{"text": "on the desk", "type": "grammar"}]	A2	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1244	7feb714e08ed09640799522c856fac9bd618d937648d79f05d28daed9e227a38	2026-09-16 07:17:03.62822+00	2026-09-17 09:53:23.562+00
01a0a913-84f4-769f-8df9-8335f4535249	01a0a913-84ba-74b3-9b64-b9872b49177e	01a0a913-84e7-7167-bfb4-df489b1fe976	I paid a lot of money.	Tôi đã trả rất nhiều tiền.	[{"text": "a lot of", "type": "grammar"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	13870585	618bd9c6cabfba8fa704f3a4b2adf9d2fec24e718ff988c23146f0438677afce	2026-09-16 07:17:03.861484+00	2026-09-17 09:53:23.926+00
01a0a913-8501-7144-a844-cafb9a922fb0	01a0a913-84ba-74b3-9b64-b9872b49177e	01a0a913-84da-7197-a53d-29ff54abc32b	How many handkerchiefs are there?	Ở chỗ đó có mấy cái khăn tay?	[{"text": "How many", "type": "grammar"}]	A2	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1326	0eef285aa369758d8d69af75da950d22149e253cadfa782bf43e291f2def3c3d	2026-09-16 07:17:03.874101+00	2026-09-17 09:53:23.95+00
01a0a913-850d-701c-8049-f4c606499969	01a0a913-84ba-74b3-9b64-b9872b49177e	01a0a913-84e7-7167-bfb4-df489b1fe976	We have a little time before the train leaves.	Chúng ta còn một ít thời gian trước khi tàu chạy.	[{"text": "a little time", "type": "grammar"}]	A2	2	01a0a478-3755-73b5-91ab-357274728de5	\N	e9209942bc078ac3f0c153270eef0e79b93a364e30d6fd20ebc8dbcd9d7c13ba	2026-09-16 07:17:03.885808+00	2026-09-17 09:53:23.973+00
01a0a913-8619-723f-b331-2d4d6b6368df	01a0a913-85dc-73aa-8f61-b2a6c22be29a	01a0a913-8604-76c2-8352-40de5304cf6a	If it rains, we will stay home.	Nếu trời mưa, chúng ta sẽ ở nhà.	[{"text": "If it rains", "type": "grammar"}, {"text": "will stay", "type": "grammar"}]	A2	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	13971628	a2af0c1aa58c0ff76fba7a8ccbf952276c5204700c00d4e9cbdd097a2547d82b	2026-09-16 07:17:04.155105+00	2026-09-17 09:53:24.305+00
01a0a913-8628-719f-aab0-7687eb83c646	01a0a913-85dc-73aa-8f61-b2a6c22be29a	01a0a913-8604-76c2-8352-40de5304cf6a	If you press this button, the door will open.	Bấm cái nút này thì cửa sẽ mở ra.	[{"text": "If you press", "type": "grammar"}, {"text": "will open", "type": "grammar"}]	A2	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	2043	9fec90c0b125095770a75fcbc9d1c9a839d09800318b2ba56d833b35faa32c10	2026-09-16 07:17:04.170105+00	2026-09-17 09:53:24.319+00
01a0a913-863d-77cb-9d29-c38e5fed1add	01a0a913-85dc-73aa-8f61-b2a6c22be29a	01a0a913-85f6-729c-802b-ea6f0aca65d5	If you heat ice, it melts.	Nếu làm nóng băng, nó tan chảy.	[{"text": "If you heat", "type": "grammar"}, {"text": "melts", "type": "grammar"}]	A2	1	01a0a478-3755-73b5-91ab-357274728de5	\N	7ae6470c677ee7ea4e4e21403c3842ae552fe13d481b44764efc52e747d66370	2026-09-16 07:17:04.190773+00	2026-09-17 09:53:24.34+00
01a0a913-8733-76e7-a5bf-dc1c45f22512	01a0a913-8706-71a7-a472-ddf21a82db1b	01a0a913-871b-7617-a5e8-3b9e32520b65	I have been waiting for three hours.	Tôi chờ ba tiếng rồi.	[{"text": "have been waiting", "type": "grammar"}, {"text": "for three hours", "type": "signal"}]	B1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	13971618	f0a9792513e1598aa7a803035620367d1d5b59ebeaa96fbdc686d28d1060bbb0	2026-09-16 07:17:04.436447+00	2026-09-17 09:53:24.622+00
01a0a913-873f-73ee-9584-22ea5a4d9298	01a0a913-8706-71a7-a472-ddf21a82db1b	01a0a913-871b-7617-a5e8-3b9e32520b65	How long have you been waiting for the bus?	Bạn đã chờ xe buýt bao lâu rồi?	[{"text": "have you been waiting", "type": "grammar"}, {"text": "How long", "type": "signal"}]	B1	3	01a0a913-7a1b-7116-a21a-1a9f18643d56	35258	7b06b5674faddabc10978b93265affc63d09435d3c8ba40ff3a80be8d426daf0	2026-09-16 07:17:04.448487+00	2026-09-17 09:53:24.635+00
01a0a913-7fd5-759b-a9db-46c7976fb30e	01a0a913-7f94-70fd-a18c-a0c3df798eff	01a0a913-7fac-7635-8c4e-b58ab79f3035	Many children were playing in the park.	Nhiều đứa trẻ đã chơi ở trong công viên.	[{"text": "were playing", "type": "grammar"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	41032	9db343238c75c7b3fc0e5173ce52501510260371bdf22303495b297268b67979	2026-09-16 07:17:02.550194+00	2026-09-17 09:53:21.944+00
01a0a913-7fe2-75d5-b433-9a00bfa8a8c3	01a0a913-7f94-70fd-a18c-a0c3df798eff	01a0a913-7fb9-770a-bb8e-43f8a42915b0	I was walking home when it started to rain.	Tôi đang đi bộ về nhà thì trời bắt đầu mưa.	[{"text": "was walking", "type": "grammar"}, {"text": "when", "type": "signal"}]	A2	2	01a0a478-3755-73b5-91ab-357274728de5	\N	375f44ea20e20fabf3b5fd15ab0105e8eb6e24b372a7cec5e19b8d9807eb75b5	2026-09-16 07:17:02.562935+00	2026-09-17 09:53:21.968+00
01a0a913-80d8-71f9-8dfc-27e5f48fc332	01a0a913-80a5-72b5-9331-8c651514ab62	01a0a913-80bf-721e-9a0d-67d4d700c16f	It will rain tomorrow.	Mai trời có thể sẽ mưa.	[{"text": "will rain", "type": "grammar"}, {"text": "tomorrow", "type": "signal"}]	A2	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	1345228	010638a90139a854499492d5fdb9508e92d00fc51b7762633b886f96c332515e	2026-09-16 07:17:02.809244+00	2026-09-17 09:53:22.286+00
01a0a913-80e4-7100-8526-4c45c7d3e899	01a0a913-80a5-72b5-9331-8c651514ab62	01a0a913-80cb-76b7-855c-6d9eb3ac9c02	Which shoes are you going to buy?	Bạn sẽ mua đôi giày nào?	[{"text": "are you going to buy", "type": "grammar"}]	A2	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1286	e5f37eaef72577bd930df73bd901c6f062fdb5b45a6c1dd6ff1489da0a3d7caa	2026-09-16 07:17:02.820954+00	2026-09-17 09:53:22.308+00
01a0a913-8a2b-7377-8520-a7b98ba55dac	01a0a913-89f9-7169-9047-f7be5382aecc	01a0a913-8a12-72f6-92a3-601b7e973ed3	Tom enjoys swimming.	Tom thích bơi.	[{"text": "enjoys swimming", "type": "grammar"}]	B1	1	01a0a913-7a1b-7116-a21a-1a9f18643d56	9733082	5fdf6709877a57196266ac4f74766604bc605c13e04123637ce4d92c1eeb2019	2026-09-16 07:17:05.196084+00	2026-09-17 09:53:25.419+00
01a0a913-8a37-74d2-b5d4-5151cf4f5c72	01a0a913-89f9-7169-9047-f7be5382aecc	01a0a913-8a1e-7002-8626-b611582f3181	I want to drink water.	Tôi muốn uống nước.	[{"text": "want to drink", "type": "grammar"}]	B1	1	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1818	17b7b5b220f501d07b77d5da6f191dad6a5de08702c674fdb3615b96893a08dd	2026-09-16 07:17:05.208032+00	2026-09-17 09:53:25.431+00
01a0a913-8a44-7369-9efc-fca87789c252	01a0a913-89f9-7169-9047-f7be5382aecc	01a0a913-8a12-72f6-92a3-601b7e973ed3	She avoided answering the difficult question.	Cô ấy tránh trả lời câu hỏi khó.	[{"text": "avoided answering", "type": "grammar"}]	B1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	17136263818580ef2fca1bdae83cd14e3fc919aa65c1baf047c34778e79f2a88	2026-09-16 07:17:05.221151+00	2026-09-17 09:53:25.443+00
01a0a913-8b12-7436-963c-0b392eeb4521	01a0a913-8ae1-7410-9119-8b27d1f52485	01a0a913-8af9-7152-ae29-1ac7bb5b9b6b	He said that he wants money.	Anh ấy đã nói rằng anh ấy muốn có tiền.	[{"text": "said that", "type": "grammar"}]	B1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	13724416	5199214431e17e46a9aaef6ef08e1dbb75d63cb41d760d159890ce3aca2f5817	2026-09-16 07:17:05.426968+00	2026-09-17 09:53:25.688+00
01a0a913-8b1e-7314-b132-4056d457a574	01a0a913-8ae1-7410-9119-8b27d1f52485	01a0a913-8b06-722d-b9a6-b006e6ef8f56	He said that he was furious.	Anh ấy đã nói rằng anh ấy rất tức giận	[{"text": "said that", "type": "grammar"}, {"text": "was furious", "type": "grammar"}]	B1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	7401955	a6a830e13836312b134b1f4d0f5a7f206608f9ead527b156724f206f9520ba25	2026-09-16 07:17:05.439406+00	2026-09-17 09:53:25.7+00
01a0a913-8b2b-7652-8644-3ab56656f67b	01a0a913-8ae1-7410-9119-8b27d1f52485	01a0a913-8b06-722d-b9a6-b006e6ef8f56	Lan told me that she would call the next day.	Lan nói với tôi rằng cô ấy sẽ gọi vào ngày hôm sau.	[{"text": "told me that", "type": "grammar"}, {"text": "would call", "type": "grammar"}]	B1	3	01a0a478-3755-73b5-91ab-357274728de5	\N	407d47e122c88595b631668ec8c8393bf4c6711df82937c0f384e1023c24425d	2026-09-16 07:17:05.452799+00	2026-09-17 09:53:25.712+00
01a0a913-7fc8-7777-83ef-bdc7714a5901	01a0a913-7f94-70fd-a18c-a0c3df798eff	01a0a913-7fb9-770a-bb8e-43f8a42915b0	When I was eating dinner, my friend came over to my home.	Lúc tôi đang ăn cơm thì bạn tới nhà.	[{"text": "was eating", "type": "grammar"}, {"text": "When", "type": "signal"}]	A2	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	2178	d5635cea8a541cb83926ac5c726fc95aac05412d80edef8b12f04aaebeab7c32	2026-09-16 07:17:02.536849+00	2026-09-17 09:53:21.918+00
01a0a913-874c-73f4-9ba9-dfbff0fcf924	01a0a913-8706-71a7-a472-ddf21a82db1b	01a0a913-871b-7617-a5e8-3b9e32520b65	I have been studying since last year.	Tôi học từ năm ngoái.	[{"text": "have been studying", "type": "grammar"}, {"text": "since last year", "type": "signal"}]	B1	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1495	7a3cad63cf7fd874b9329d70bac6c99fd86c16a49d4228cc1fab4ec0bbc47ced	2026-09-16 07:17:04.460985+00	2026-09-17 09:53:24.648+00
01a0a913-881c-7329-a8f0-bfc07aff070d	01a0a913-87ee-716d-9750-3287ccd8f2e6	01a0a913-8810-7581-8473-079d3d69c368	The building was built in 1960.	Tòa nhà được xây vào năm 1960.	[{"text": "was built", "type": "grammar"}, {"text": "in 1960", "type": "signal"}]	B1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	48317	e8445767b569453e65dcd652d6732795abf8e047907ca8befba01d9ad4f95a56	2026-09-16 07:17:04.669054+00	2026-09-17 09:53:24.892+00
01a0a913-8829-775a-9f6c-162e8fc44e7d	01a0a913-87ee-716d-9750-3287ccd8f2e6	01a0a913-8810-7581-8473-079d3d69c368	It was written in the letter.	Điều đó có viết trong thư.	[{"text": "was written", "type": "grammar"}]	B1	2	01a0a913-7a29-756b-951f-0aeeaa19eb9f	1482	4d2456baab2a0934deb9ad247927d3778195995a58a2b09cdccb082dbf246cca	2026-09-16 07:17:04.681737+00	2026-09-17 09:53:24.904+00
01a0a913-8835-7557-aba1-93b468a94146	01a0a913-87ee-716d-9750-3287ccd8f2e6	01a0a913-8804-7268-87d8-4bbe1d0fbd7e	English is spoken in many countries.	Tiếng Anh được nói ở nhiều quốc gia.	[{"text": "is spoken", "type": "grammar"}]	B1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	cca1f521897bacb26e171734d3e5d69aedeef8c652cbb8050761f344f8d952d1	2026-09-16 07:17:04.694316+00	2026-09-17 09:53:24.917+00
01a0a913-891c-74bb-bc3a-79b4511e85bf	01a0a913-88e3-7053-9a95-361c6bffcf68	01a0a913-88fc-760d-8184-102af08f283f	The man who lives next door is a musician.	Người đàn ông sống kế bên là một nhạc sĩ.	[{"text": "who lives next door", "type": "grammar"}]	B1	2	01a0a913-7a1b-7116-a21a-1a9f18643d56	13971634	34daff34bf40eba929d2ef18800b667da19adcd618757dce7b02f056d5792ec5	2026-09-16 07:17:04.925042+00	2026-09-17 09:53:25.15+00
01a0a913-892a-742a-815f-1cc05b3021a4	01a0a913-88e3-7053-9a95-361c6bffcf68	01a0a913-8908-77cc-a18d-6d924dccd4e9	The film I saw yesterday was interesting.	Bộ phim tôi xem hôm qua rất thú vị.	[{"text": "I saw yesterday", "type": "grammar"}, {"text": "yesterday", "type": "signal"}]	B1	3	01a0a913-7a29-756b-951f-0aeeaa19eb9f	2154	74854784b6317b373598fd8e26ef567b3148fd723d2b2ca68a6def087517948f	2026-09-16 07:17:04.938691+00	2026-09-17 09:53:25.162+00
01a0a913-8936-758b-befe-90c03327a298	01a0a913-88e3-7053-9a95-361c6bffcf68	01a0a913-88fc-760d-8184-102af08f283f	This is the book that explains the rule clearly.	Đây là cuốn sách giải thích quy tắc một cách rõ ràng.	[{"text": "that explains the rule", "type": "grammar"}]	B1	2	01a0a478-3755-73b5-91ab-357274728de5	\N	745020a95bf3e65dd595fc295b89e1a8396a9117d8fa55247ea1418cb9fc3e7a	2026-09-16 07:17:04.951404+00	2026-09-17 09:53:25.173+00
\.


--
-- Data for Name: grammar_lessons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_lessons (id, topic_id, version, body, status, published_at, created_at, updated_at) FROM stdin;
01a0a913-7dbe-75f7-8027-00dbb9d2a9a8	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	1	{"tips": ["Chọn a/an theo âm đầu, không chỉ theo chữ cái: an hour nhưng a university.", "Nhắc lần đầu dùng a/an; nhắc lại cùng đối tượng thường dùng the."], "formation": {"negative": "not + a/an/the + noun", "question": "question word/auxiliary + a/an/the + noun?", "affirmative": "a/an + singular countable noun · the + specific noun"}, "when_to_use": "Dùng a/an khi nhắc lần đầu đến một người hoặc vật chưa cụ thể. Dùng the khi người nghe biết rõ đối tượng hoặc đối tượng là duy nhất.", "signal_words": ["one of many", "first mention", "already known", "only", "same"], "when_not_to_use": "Không dùng a/an với danh từ số nhiều hay không đếm được. Không tự động thêm the trước tên riêng hoặc khi nói chung về một khái niệm."}	published	2026-09-17 09:53:21.098+00	2026-09-16 07:17:02.015582+00	2026-09-17 09:53:21.098+00
01a0a913-7ea7-70a3-acf5-c7ba189c6cfc	01a0a913-7ea1-7118-becd-d45626898a5b	1	{"tips": ["Không bỏ động từ be trước V-ing.", "Một số động từ đổi chính tả: make → making, run → running, lie → lying."], "formation": {"negative": "subject + am/is/are not + V-ing", "question": "Am/Is/Are + subject + V-ing?", "affirmative": "subject + am/is/are + V-ing"}, "when_to_use": "Dùng cho hành động đang diễn ra ngay bây giờ, tình huống tạm thời, hoặc kế hoạch cá nhân đã sắp xếp.", "signal_words": ["now", "right now", "at the moment", "today", "this week"], "when_not_to_use": "Không dùng cho thói quen đều đặn. Các động từ chỉ trạng thái như know, need, believe thường không dùng ở dạng tiếp diễn."}	published	2026-09-17 09:53:21.492+00	2026-09-16 07:17:02.254745+00	2026-09-17 09:53:21.492+00
01a0a913-7f9e-737c-b03f-9cfbf7bc400e	01a0a913-7f94-70fd-a18c-a0c3df798eff	1	{"tips": ["I/he/she/it đi với was; you/we/they đi với were.", "Hành động nền thường dùng quá khứ tiếp diễn; việc xen vào thường dùng quá khứ đơn."], "formation": {"negative": "subject + was/were not + V-ing", "question": "Was/Were + subject + V-ing?", "affirmative": "subject + was/were + V-ing"}, "when_to_use": "Dùng để nói việc đang diễn ra ở một mốc quá khứ, hai việc cùng diễn ra, hoặc bối cảnh khi một sự việc khác xảy đến.", "signal_words": ["while", "when", "at 8 p.m. yesterday", "all evening"], "when_not_to_use": "Không dùng cho một sự việc ngắn đã hoàn tất đơn lẻ. Khi chỉ kể chuỗi hành động đã xong, dùng quá khứ đơn."}	published	2026-09-17 09:53:21.866+00	2026-09-16 07:17:02.495374+00	2026-09-17 09:53:21.867+00
01a0a478-37e2-729c-b584-7b61e148c208	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	1	{"tips": ["Với he/she/it nhớ thêm -s/-es: works, goes, watches.", "Câu hỏi và phủ định: động từ chính luôn ở dạng nguyên mẫu (không thêm -s)."], "formation": {"negative": "do/does + not + V (nguyên mẫu)", "question": "Do/Does + subject + V (nguyên mẫu)?", "affirmative": "I/you/we/they + V · he/she/it + V(s/es)"}, "when_to_use": "Khi nói về thói quen hàng ngày, lịch trình lặp lại, hoặc sự thật khoa học / luôn đúng.", "signal_words": ["always", "usually", "often", "sometimes", "never", "every day"], "when_not_to_use": "Không dùng cho hành động đang xảy ra ngay lúc nói (dùng Present Continuous), cũng không dùng cho trải nghiệm gắn với hiện tại (Present Perfect)."}	published	2026-09-17 09:53:20.152+00	2026-09-15 09:48:57.186856+00	2026-09-17 09:53:20.153+00
01a0a478-3898-7607-bb00-0acb3986e4b8	01a0a2d1-208d-74be-a817-4d4b7f159a6c	1	{"tips": ["Sau did/didn't động từ chính luôn nguyên mẫu: Did you go? (không went).", "Động từ bất quy tắc phải học thuộc (go → went, see → saw)."], "formation": {"negative": "did + not + V (nguyên mẫu)", "question": "Did + subject + V (nguyên mẫu)?", "affirmative": "Subject + V2 (regular: -ed / irregular)"}, "when_to_use": "Khi kể chuyện đã xảy ra xong, có mốc thời gian rõ (yesterday, last week, in 2019).", "signal_words": ["yesterday", "last week", "last year", "ago", "in 2019"], "when_not_to_use": "Không dùng khi nhấn mạnh trải nghiệm đến hiện tại mà không nêu thời điểm cụ thể — lúc đó thường dùng Present Perfect."}	published	2026-09-17 09:53:20.507+00	2026-09-15 09:48:57.369948+00	2026-09-17 09:53:20.507+00
01a0a478-392b-77a2-889b-ea69c140def0	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	1	{"tips": ["Have/has + quá khứ phân từ (V3), không phải V2: have gone (không have went).", "Đừng nhầm với Past Simple: Present Perfect không kèm yesterday/last year."], "formation": {"negative": "have/has + not + V3", "question": "Have/Has + subject + V3?", "affirmative": "have/has + V3 (past participle)"}, "when_to_use": "Khi nói về trải nghiệm đời sống (ever/never), việc vừa xảy ra còn ảnh hưởng hiện tại, hoặc khoảng thời gian chưa kết thúc (this week, today).", "signal_words": ["ever", "never", "already", "yet", "just", "since", "for"], "when_not_to_use": "Không dùng với mốc thời gian quá khứ cụ thể như yesterday / in 2019 — lúc đó dùng Past Simple."}	published	2026-09-17 09:53:20.789+00	2026-09-15 09:48:57.516043+00	2026-09-17 09:53:20.789+00
01a0a913-85e8-7775-851c-3417efc2c0fd	01a0a913-85dc-73aa-8f61-b2a6c22be29a	1	{"tips": ["Loại 0: hiện tại đơn ở cả hai mệnh đề.", "Loại 1: mệnh đề if dùng hiện tại đơn, mệnh đề chính thường dùng will."], "formation": {"negative": "If + subject + do/does not + V, subject + do/does not/will not + V", "question": "What will + subject + do if + Present Simple?", "affirmative": "If + Present Simple, Present Simple/will + base verb"}, "when_to_use": "Dùng loại 0 cho quy luật, hướng dẫn và thói quen. Dùng loại 1 khi điều kiện tương lai có khả năng xảy ra.", "signal_words": ["if", "when", "unless", "as soon as"], "when_not_to_use": "Không đặt will trong mệnh đề if của câu điều kiện loại 1 thông thường. Không dùng loại 1 cho sự thật luôn đúng nếu loại 0 diễn đạt chính xác hơn."}	published	2026-09-17 09:53:24.254+00	2026-09-16 07:17:04.105101+00	2026-09-17 09:53:24.254+00
01a0a913-8711-7421-b857-14102eb52058	01a0a913-8706-71a7-a472-ddf21a82db1b	1	{"tips": ["Since đi với điểm bắt đầu; for đi với khoảng thời gian.", "Chọn dạng tiếp diễn khi quá trình quan trọng hơn kết quả hoàn thành."], "formation": {"negative": "subject + have/has not been + V-ing", "question": "Have/Has + subject + been + V-ing?", "affirmative": "subject + have/has been + V-ing"}, "when_to_use": "Dùng khi muốn nhấn mạnh thời lượng hay tính liên tục của hoạt động đến hiện tại, hoặc giải thích một kết quả hiện tại bằng hoạt động vừa diễn ra.", "signal_words": ["since", "for", "all day", "lately", "recently", "how long"], "when_not_to_use": "Không thường dùng với động từ trạng thái như know, own, believe. Khi nhấn mạnh kết quả hoàn tất hoặc số lượng đã làm xong, dùng hiện tại hoàn thành đơn."}	published	2026-09-17 09:53:24.578+00	2026-09-16 07:17:04.401853+00	2026-09-17 09:53:24.578+00
01a0a913-87fa-76ee-aa47-1cbf57d1ce8c	01a0a913-87ee-716d-9750-3287ccd8f2e6	1	{"tips": ["Thì nằm ở động từ be; động từ chính luôn ở V3.", "Tân ngữ của câu chủ động trở thành chủ ngữ câu bị động."], "formation": {"negative": "subject + be + not + V3", "question": "Be + subject + V3?", "affirmative": "subject + am/is/are or was/were + V3"}, "when_to_use": "Dùng khi người thực hiện không rõ, không quan trọng, hoặc khi đối tượng chịu tác động cần được nhấn mạnh.", "signal_words": ["by", "every day", "in 1960", "was built", "is made"], "when_not_to_use": "Không lạm dụng bị động khi chủ thể hành động quan trọng và câu chủ động rõ hơn. Chỉ thêm by + tác nhân khi thông tin đó thực sự cần thiết."}	published	2026-09-17 09:53:24.854+00	2026-09-16 07:17:04.634966+00	2026-09-17 09:53:24.854+00
01a0a913-81b2-7493-9092-bad8075f5495	01a0a913-81a6-7658-91c8-f2b85c920739	1	{"tips": ["Can/could giữ nguyên với mọi chủ ngữ.", "Could you…? lịch sự hơn Can you…? trong lời yêu cầu."], "formation": {"negative": "subject + cannot/could not + base verb", "question": "Can/Could + subject + base verb?", "affirmative": "subject + can/could + base verb"}, "when_to_use": "Dùng can cho khả năng hiện tại và lời xin phép thân mật. Dùng could cho khả năng chung trong quá khứ, khả năng chưa chắc chắn hoặc yêu cầu lịch sự.", "signal_words": ["now", "when I was young", "please", "possibly"], "when_not_to_use": "Không thêm to hoặc chia động từ sau can/could. Khi nói một lần thành công cụ thể trong quá khứ, was/were able to thường rõ nghĩa hơn could."}	published	2026-09-17 09:53:22.601+00	2026-09-16 07:17:03.0273+00	2026-09-17 09:53:22.601+00
01a0a913-82b7-71f9-b478-b25b3c02512e	01a0a913-82ab-74cc-9a37-de2a25e7cea7	1	{"tips": ["Tính từ ngắn thường thêm -er/-est; tính từ dài thường dùng more/most.", "Học riêng các dạng bất quy tắc: good → better → best; bad → worse → worst."], "formation": {"negative": "not as + adjective + as · less + adjective + than", "question": "Which/Who + be + comparative/superlative?", "affirmative": "adjective-er + than · more + adjective + than · the adjective-est/most adjective"}, "when_to_use": "Dùng comparative + than để so hai đối tượng. Dùng the + superlative khi một đối tượng có mức độ cao hoặc thấp nhất trong nhóm.", "signal_words": ["than", "of all", "in the group", "the most", "the least"], "when_not_to_use": "Không dùng đồng thời more với đuôi -er hoặc most với đuôi -est. Không quên the trước dạng so sánh nhất thông thường."}	published	2026-09-17 09:53:22.96+00	2026-09-16 07:17:03.288126+00	2026-09-17 09:53:22.96+00
01a0a913-83c5-74eb-95fc-8e8fe53644ea	01a0a913-83b8-71cc-92e0-59a0e7c85106	1	{"tips": ["Thời gian: in cho tháng/năm, on cho ngày, at cho giờ.", "Nơi chốn: in là bên trong, on là trên bề mặt, at là một điểm."], "formation": {"negative": "subject + do/be not + verb/complement + in/on/at + time/place", "question": "When/Where + auxiliary + subject + verb?", "affirmative": "subject + verb + in/on/at + time/place"}, "when_to_use": "Dùng in cho khoảng thời gian hoặc không gian rộng, on cho ngày và bề mặt, at cho thời điểm hay vị trí cụ thể.", "signal_words": ["in the morning", "on Monday", "at 7 o'clock", "in a city", "on a surface"], "when_not_to_use": "Không áp dụng quy tắc máy móc cho mọi cụm cố định. Một số cách nói như at night, on the bus cần được học nguyên cụm."}	published	2026-09-17 09:53:23.422+00	2026-09-16 07:17:03.558206+00	2026-09-17 09:53:23.424+00
01a0a913-84c6-7488-9a5e-98cf730f7727	01a0a913-84ba-74b3-9b64-b9872b49177e	1	{"tips": ["Đếm được: many, a few; không đếm được: much, a little.", "A lot of dùng tự nhiên với cả hai loại danh từ trong câu khẳng định."], "formation": {"negative": "not many/much · no + noun", "question": "How many + plural noun? · How much + uncountable noun?", "affirmative": "some/a lot of/many/much/a few/a little + noun"}, "when_to_use": "Dùng many/few với danh từ đếm được số nhiều; much/little với danh từ không đếm được. A lot of và some dùng được trong nhiều ngữ cảnh.", "signal_words": ["how many", "how much", "a lot of", "a few", "a little"], "when_not_to_use": "Không dùng many trực tiếp với danh từ không đếm được hoặc much với danh từ đếm được số nhiều. Phân biệt few/little mang nghĩa gần như không đủ với a few/a little mang nghĩa vẫn có một ít."}	published	2026-09-17 09:53:23.887+00	2026-09-16 07:17:03.821824+00	2026-09-17 09:53:23.887+00
01a0a913-88ef-728d-878d-f748c72e9735	01a0a913-88e3-7053-9a95-361c6bffcf68	1	{"tips": ["Who dùng cho người; which dùng cho vật; that thường dùng cho cả hai trong mệnh đề xác định.", "Có thể bỏ đại từ quan hệ khi nó làm tân ngữ, nhưng không bỏ khi nó làm chủ ngữ."], "formation": {"negative": "noun + who/which/that + auxiliary + not + verb", "question": "question clause + noun + who/which/that + clause?", "affirmative": "noun + who/which/that + verb/clause"}, "when_to_use": "Dùng để xác định người hoặc vật đang nói đến, hoặc thêm thông tin phụ. Chọn đại từ quan hệ theo danh từ đứng trước và vai trò trong mệnh đề.", "signal_words": ["who", "which", "that", "whose", "where"], "when_not_to_use": "Không dùng what ngay sau một danh từ với vai trò đại từ quan hệ. Không dùng that trong mệnh đề không xác định được ngăn bằng dấu phẩy."}	published	2026-09-17 09:53:25.115+00	2026-09-16 07:17:04.880188+00	2026-09-17 09:53:25.115+00
01a0a913-8a04-728d-ba60-53a9d686bf1f	01a0a913-89f9-7169-9047-f7be5382aecc	1	{"tips": ["Học cả cụm: enjoy doing, decide to do.", "Sau giới từ dùng V-ing: interested in learning."], "formation": {"negative": "not + V-ing · not to + base verb", "question": "auxiliary + subject + verb + V-ing/to + V?", "affirmative": "verb + V-ing · verb + to + base verb"}, "when_to_use": "Dùng V-ing sau enjoy, avoid, finish và sau giới từ. Dùng to + V sau want, decide, hope và để diễn tả mục đích.", "signal_words": ["enjoy", "avoid", "finish", "want", "decide", "hope"], "when_not_to_use": "Không chọn dạng theo cách dịch từng từ sang tiếng Việt. Với remember, stop, try và regret, đổi giữa V-ing và to + V có thể làm đổi nghĩa."}	published	2026-09-17 09:53:25.372+00	2026-09-16 07:17:05.157519+00	2026-09-17 09:53:25.372+00
01a0a913-8aed-719e-a7ed-9b20588dfd6c	01a0a913-8ae1-7410-9119-8b27d1f52485	1	{"tips": ["Say something; tell someone something.", "Khi lùi thì: present → past, will → would, can → could; đồng thời đổi đại từ và mốc thời gian nếu cần."], "formation": {"negative": "said/told + clause with not", "question": "asked + if/whether or question word + statement word order", "affirmative": "said (that) + clause · told + object + (that) + clause"}, "when_to_use": "Dùng để thuật lại lời nói, suy nghĩ hoặc câu hỏi của người khác. Backshift thường xuất hiện sau said/told ở quá khứ khi nội dung không còn được trình bày như lời trực tiếp.", "signal_words": ["said", "told", "asked", "that", "if", "whether"], "when_not_to_use": "Không lùi thì máy móc nếu thông tin vẫn là sự thật chung hoặc vẫn còn đúng và người nói muốn nhấn mạnh điều đó. Không dùng said + tân ngữ trực tiếp; dùng told + tân ngữ."}	published	2026-09-17 09:53:25.643+00	2026-09-16 07:17:05.390038+00	2026-09-17 09:53:25.643+00
01a0a913-80b3-70e1-b579-da076b5d7fa0	01a0a913-80a5-72b5-9331-8c651514ab62	1	{"tips": ["Sau will và going to đều dùng động từ nguyên mẫu.", "Nhìn dấu hiệu hiện tại để dự đoán thì ưu tiên be going to."], "formation": {"negative": "subject + will not + V · subject + be not going to + V", "question": "Will + subject + V? · Be + subject + going to + V?", "affirmative": "subject + will + V · subject + am/is/are going to + V"}, "when_to_use": "Dùng will cho quyết định tức thời, lời đề nghị, lời hứa và dự đoán chủ quan. Dùng be going to cho kế hoạch đã định hoặc khi có bằng chứng rõ.", "signal_words": ["tomorrow", "next week", "I think", "probably", "look!"], "when_not_to_use": "Không dùng will chỉ vì câu nói về tương lai; cần xét người nói đã có kế hoạch hay chưa. Với lịch trình cố định, hiện tại đơn thường tự nhiên hơn."}	published	2026-09-17 09:53:22.234+00	2026-09-16 07:17:02.772039+00	2026-09-17 09:53:22.234+00
\.


--
-- Data for Name: grammar_mistakes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_mistakes (id, topic_id, incorrect_sentence, correct_sentence, error_type, explanation_vi, severity, cefr_level, created_at, updated_at) FROM stdin;
01a0a913-7e0f-732a-a5b3-347579d87599	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	He is an university student.	He is a university student.	article	University bắt đầu bằng âm /j/, là âm phụ âm, nên dùng a chứ không dùng an.	2	A1	2026-09-16 07:17:02.095803+00	2026-09-17 09:53:21.22+00
01a0a913-7ef6-71f0-9529-7d188f4bdc41	01a0a913-7ea1-7118-becd-d45626898a5b	He working now.	He is working now.	verb_tense	Hiện tại tiếp diễn bắt buộc có động từ be; với he dùng is.	2	A1	2026-09-16 07:17:02.327512+00	2026-09-17 09:53:21.646+00
01a0a913-7f03-7687-9ee4-1881b9d08156	01a0a913-7ea1-7118-becd-d45626898a5b	They are play football.	They are playing football.	verb_tense	Sau are phải dùng dạng V-ing: playing.	2	A1	2026-09-16 07:17:02.340097+00	2026-09-17 09:53:21.661+00
01a0a913-7fef-7528-9b7d-4fbf0fa20796	01a0a913-7f94-70fd-a18c-a0c3df798eff	They was watching TV.	They were watching TV.	subject_verb_agreement	Chủ ngữ they đi với were, không đi với was.	2	A2	2026-09-16 07:17:02.576113+00	2026-09-17 09:53:21.989+00
01a0a913-7ffb-7666-be91-b33204a3c10a	01a0a913-7f94-70fd-a18c-a0c3df798eff	I was cook when she called.	I was cooking when she called.	verb_tense	Sau was phải dùng động từ dạng V-ing: cooking.	2	A2	2026-09-16 07:17:02.588096+00	2026-09-17 09:53:22.004+00
01a0a478-395a-7649-92a8-7f1ab5707a5d	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	I have seen him yesterday.	I saw him yesterday.	verb_tense	Có yesterday (mốc quá khứ cụ thể) thì dùng Past Simple, không dùng Present Perfect.	3	B1	2026-09-15 09:48:57.562783+00	2026-09-17 09:53:20.865+00
01a0a913-80fb-72eb-94b3-bbe237c6ca63	01a0a913-80a5-72b5-9331-8c651514ab62	She will goes tomorrow.	She will go tomorrow.	verb_tense	Sau will luôn dùng động từ nguyên mẫu go, không thêm -s.	2	A2	2026-09-16 07:17:02.844451+00	2026-09-17 09:53:22.349+00
01a0a913-810a-71fe-8770-25d777179c8d	01a0a913-80a5-72b5-9331-8c651514ab62	They going to travel next week.	They are going to travel next week.	verb_tense	Cấu trúc be going to cần are với chủ ngữ they.	2	A2	2026-09-16 07:17:02.85891+00	2026-09-17 09:53:22.371+00
01a0a913-81fe-7050-8117-5a7340c0de43	01a0a913-81a6-7658-91c8-f2b85c920739	She can to drive.	She can drive.	modal	Sau can dùng động từ nguyên mẫu không to: can drive.	2	A2	2026-09-16 07:17:03.103403+00	2026-09-17 09:53:22.714+00
01a0a913-8209-7621-8fbb-6b863c2483a1	01a0a913-81a6-7658-91c8-f2b85c920739	He cans swim well.	He can swim well.	modal	Động từ khuyết thiếu can không thêm -s với ngôi thứ ba số ít.	2	A2	2026-09-16 07:17:03.114224+00	2026-09-17 09:53:22.727+00
01a0a913-830b-7501-ac92-f1f282b603c8	01a0a913-82ab-74cc-9a37-de2a25e7cea7	This bag is more cheaper.	This bag is cheaper.	other	Cheaper đã là dạng so sánh hơn, vì vậy không thêm more.	2	A2	2026-09-16 07:17:03.371891+00	2026-09-17 09:53:23.119+00
01a0a913-8316-77fb-974c-af565a6bba3f	01a0a913-82ab-74cc-9a37-de2a25e7cea7	She is tallest student in the class.	She is the tallest student in the class.	other	Dạng so sánh nhất tallest cần the ở phía trước.	2	A2	2026-09-16 07:17:03.383441+00	2026-09-17 09:53:23.141+00
01a0a913-8417-73e6-965c-a33052f5dada	01a0a913-83b8-71cc-92e0-59a0e7c85106	The meeting starts in 9 a.m.	The meeting starts at 9 a.m.	preposition	Giờ cụ thể đi với at: at 9 a.m.	2	A2	2026-09-16 07:17:03.640349+00	2026-09-17 09:53:23.593+00
01a0a913-8423-758f-a272-0cf4a3c43e9c	01a0a913-83b8-71cc-92e0-59a0e7c85106	I was born at July.	I was born in July.	preposition	Tháng đi với in: in July.	2	A2	2026-09-16 07:17:03.652364+00	2026-09-17 09:53:23.609+00
01a0a913-8518-74fc-aaa8-afcc3af723df	01a0a913-84ba-74b3-9b64-b9872b49177e	How much books do you have?	How many books do you have?	other	Books là danh từ đếm được số nhiều nên dùng how many.	2	A2	2026-09-16 07:17:03.897389+00	2026-09-17 09:53:23.997+00
01a0a913-8524-7170-9794-bead166d35ea	01a0a913-84ba-74b3-9b64-b9872b49177e	I need a few water.	I need a little water.	other	Water không đếm được nên dùng a little, không dùng a few.	2	A2	2026-09-16 07:17:03.909383+00	2026-09-17 09:53:24.014+00
01a0a913-864c-75ed-84c3-8134989472fb	01a0a913-85dc-73aa-8f61-b2a6c22be29a	If it will rain, we will stay home.	If it rains, we will stay home.	conditional	Mệnh đề if của điều kiện loại 1 dùng hiện tại đơn, không dùng will.	3	A2	2026-09-16 07:17:04.204971+00	2026-09-17 09:53:24.355+00
01a0a913-865a-7023-a136-45c09505c602	01a0a913-85dc-73aa-8f61-b2a6c22be29a	If you heat water, it will boils.	If you heat water, it boils.	conditional	Đây là sự thật chung nên dùng loại 0 với hiện tại đơn ở cả hai vế: boils.	2	A2	2026-09-16 07:17:04.218958+00	2026-09-17 09:53:24.367+00
01a0a913-8758-70f1-9bc0-83c5cd0c3061	01a0a913-8706-71a7-a472-ddf21a82db1b	She has been work here for May.	She has been working here since May.	verb_tense	Sau been dùng V-ing; May là mốc bắt đầu nên đi với since.	3	B1	2026-09-16 07:17:04.472853+00	2026-09-17 09:53:24.661+00
01a0a913-8764-72a1-8941-d641977e773b	01a0a913-8706-71a7-a472-ddf21a82db1b	I have been knowing him for years.	I have known him for years.	verb_tense	Know là động từ trạng thái, vì vậy thường dùng hiện tại hoàn thành đơn thay vì dạng tiếp diễn.	2	B1	2026-09-16 07:17:04.484717+00	2026-09-17 09:53:24.672+00
01a0a913-8842-7385-96eb-06d258d10da3	01a0a913-87ee-716d-9750-3287ccd8f2e6	The bridge built in 1990.	The bridge was built in 1990.	passive	Câu bị động quá khứ cần was trước V3 built.	3	B1	2026-09-16 07:17:04.707086+00	2026-09-17 09:53:24.929+00
01a0a913-884e-77c4-a599-683e611bab2a	01a0a913-87ee-716d-9750-3287ccd8f2e6	These cars is made in Japan.	These cars are made in Japan.	passive	Chủ ngữ số nhiều these cars đi với are.	2	B1	2026-09-16 07:17:04.718468+00	2026-09-17 09:53:24.942+00
01a0a913-8942-7578-bcdc-1b413bcc145b	01a0a913-88e3-7053-9a95-361c6bffcf68	The woman which called me is my aunt.	The woman who called me is my aunt.	relative_clause	Danh từ chỉ người woman đi với who, không dùng which.	2	B1	2026-09-16 07:17:04.963639+00	2026-09-17 09:53:25.186+00
01a0a913-894f-709b-9ca6-a6284dc39837	01a0a913-88e3-7053-9a95-361c6bffcf68	The book who I bought is useful.	The book that I bought is useful.	relative_clause	Book chỉ vật nên dùng that hoặc which, không dùng who.	2	B1	2026-09-16 07:17:04.975749+00	2026-09-17 09:53:25.199+00
01a0a913-8a4f-7701-864a-f28af84c90c0	01a0a913-89f9-7169-9047-f7be5382aecc	I enjoy to read before bed.	I enjoy reading before bed.	gerund_infinitive	Enjoy đi với V-ing, nên dùng reading.	2	B1	2026-09-16 07:17:05.231837+00	2026-09-17 09:53:25.456+00
01a0a913-8a5b-774f-a762-6e44595a4c09	01a0a913-89f9-7169-9047-f7be5382aecc	They decided going by train.	They decided to go by train.	gerund_infinitive	Decide đi với to + động từ nguyên mẫu: to go.	2	B1	2026-09-16 07:17:05.243717+00	2026-09-17 09:53:25.468+00
01a0a913-8b38-77dc-b0a1-80a7cf150335	01a0a913-8ae1-7410-9119-8b27d1f52485	She said me that she was tired.	She told me that she was tired.	other	Khi nêu trực tiếp người nghe me, dùng told me thay vì said me.	2	B1	2026-09-16 07:17:05.464807+00	2026-09-17 09:53:25.724+00
01a0a913-8b45-70ee-bdf7-bad7bb649828	01a0a913-8ae1-7410-9119-8b27d1f52485	He said that he will come the next day.	He said that he would come the next day.	verb_tense	Sau động từ tường thuật said ở quá khứ, will thường lùi thành would.	2	B1	2026-09-16 07:17:05.478186+00	2026-09-17 09:53:25.735+00
01a0a478-3836-7498-bdcf-4690643807c5	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	She work at a hospital.	She works at a hospital.	subject_verb_agreement	Với she phải thêm -s vào động từ: works, không phải work.	2	A1	2026-09-15 09:48:57.271135+00	2026-09-17 09:53:20.328+00
01a0a478-383d-76f1-9d5e-dadc81851bdb	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	He don't like coffee.	He doesn't like coffee.	subject_verb_agreement	Ngôi thứ ba số ít dùng doesn't, không dùng don't.	2	A1	2026-09-15 09:48:57.278589+00	2026-09-17 09:53:20.349+00
01a0a478-38cc-72c9-a671-0f898a8dea35	01a0a2d1-208d-74be-a817-4d4b7f159a6c	I didn't went to the party.	I didn't go to the party.	verb_tense	Sau didn't phải dùng nguyên mẫu go, không dùng went.	2	A2	2026-09-15 09:48:57.421475+00	2026-09-17 09:53:20.606+00
01a0a478-38d3-7113-9bd3-2f7a2aafe86c	01a0a2d1-208d-74be-a817-4d4b7f159a6c	Did she saw the movie?	Did she see the movie?	verb_tense	Sau Did động từ chính ở nguyên mẫu: see, không phải saw.	2	A2	2026-09-15 09:48:57.427525+00	2026-09-17 09:53:20.623+00
01a0a913-7e1b-712b-b8ca-442150293b04	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	I like the music in general.	I like music in general.	article	Music là danh từ không đếm được và đang được nói theo nghĩa chung, vì vậy không cần the.	2	A1	2026-09-16 07:17:02.108829+00	2026-09-17 09:53:21.242+00
\.


--
-- Data for Name: grammar_rules; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_rules (id, topic_id, title_en, title_vi, pattern, explanation_vi, order_index, created_at, updated_at) FROM stdin;
01a0a913-7dda-7618-92a5-750e19f8f138	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	The and zero article	The và trường hợp không dùng mạo từ	the + specific noun · Ø + general plural/uncountable noun	The dùng cho đối tượng cụ thể hoặc duy nhất trong ngữ cảnh. Khi nói chung bằng danh từ số nhiều hay không đếm được, ta thường bỏ mạo từ.	2	2026-09-16 07:17:02.042763+00	2026-09-17 09:53:21.148+00
01a0a913-7ebc-7517-b165-3454be64e2ea	01a0a913-7ea1-7118-becd-d45626898a5b	Be plus -ing	Be kết hợp với V-ing	am/is/are + V-ing	Chia am/is/are theo chủ ngữ rồi thêm -ing vào động từ chính. Phủ định đặt not sau be; câu hỏi đưa be lên trước chủ ngữ.	1	2026-09-16 07:17:02.268731+00	2026-09-17 09:53:21.517+00
01a0a913-7ec9-70ba-b384-cad1671288d7	01a0a913-7ea1-7118-becd-d45626898a5b	Actions now and temporary situations	Việc đang diễn ra và tình huống tạm thời	be + V-ing + now/temporary time phrase	Dạng tiếp diễn nhấn mạnh hoạt động có tính tạm thời hoặc đang trong quá trình. Nó khác hiện tại đơn ở chỗ không diễn tả thói quen ổn định.	2	2026-09-16 07:17:02.282532+00	2026-09-17 09:53:21.539+00
01a0a913-7fac-7635-8c4e-b58ab79f3035	01a0a913-7f94-70fd-a18c-a0c3df798eff	Action in progress in the past	Hành động đang diễn ra trong quá khứ	was/were + V-ing	Cấu trúc này đặt người nghe vào giữa một hành động ở mốc quá khứ. Mốc thời gian có thể được nêu trực tiếp hoặc hiểu từ ngữ cảnh.	1	2026-09-16 07:17:02.508861+00	2026-09-17 09:53:21.883+00
01a0a913-7fb9-770a-bb8e-43f8a42915b0	01a0a913-7f94-70fd-a18c-a0c3df798eff	Interrupted past action	Hành động quá khứ bị xen vào	was/were + V-ing when + Past Simple	Việc đang kéo dài dùng quá khứ tiếp diễn; sự việc ngắn xảy đến dùng quá khứ đơn. While thường nối hai hoạt động cùng diễn ra.	2	2026-09-16 07:17:02.522474+00	2026-09-17 09:53:21.903+00
01a0a913-80bf-721e-9a0d-67d4d700c16f	01a0a913-80a5-72b5-9331-8c651514ab62	Spontaneous decisions and predictions	Quyết định tức thời và dự đoán	will + base verb	Will phù hợp khi quyết định được đưa ra ngay lúc nói hoặc khi người nói nêu dự đoán, lời hứa. Will không thay đổi theo chủ ngữ.	1	2026-09-16 07:17:02.784489+00	2026-09-17 09:53:22.249+00
01a0a913-80cb-76b7-855c-6d9eb3ac9c02	01a0a913-80a5-72b5-9331-8c651514ab62	Plans and evidence-based predictions	Dự định và dự đoán có căn cứ	am/is/are going to + base verb	Be going to cho thấy ý định đã hình thành trước lúc nói. Nó cũng dùng khi dấu hiệu hiện tại khiến kết quả tương lai dễ thấy.	2	2026-09-16 07:17:02.795978+00	2026-09-17 09:53:22.272+00
01a0a913-81c0-71fb-8133-27e417f4dc55	01a0a913-81a6-7658-91c8-f2b85c920739	Ability	Khả năng	can/could + base verb	Can nói khả năng hiện tại; could thường nói khả năng chung trong quá khứ. Động từ theo sau luôn ở nguyên mẫu không to.	1	2026-09-16 07:17:03.040602+00	2026-09-17 09:53:22.617+00
01a0a913-81cc-7031-9345-93f205212c60	01a0a913-81a6-7658-91c8-f2b85c920739	Permission and requests	Xin phép và yêu cầu	Can/Could + subject + base verb?	Can dùng trong tình huống gần gũi; could tạo sắc thái mềm và lịch sự hơn. Could ở đây không mang nghĩa quá khứ.	2	2026-09-16 07:17:03.053437+00	2026-09-17 09:53:22.639+00
01a0a913-82c4-715c-bbb6-adf5d2dda7b0	01a0a913-82ab-74cc-9a37-de2a25e7cea7	Comparative forms	Dạng so sánh hơn	short adjective-er / more + long adjective + than	Dùng so sánh hơn khi đặt hai người hoặc vật cạnh nhau. Than giới thiệu đối tượng được dùng làm mốc so sánh.	1	2026-09-16 07:17:03.300714+00	2026-09-17 09:53:22.996+00
01a0a913-82d0-7479-89dc-f45b0b5dcecb	01a0a913-82ab-74cc-9a37-de2a25e7cea7	Superlative forms	Dạng so sánh nhất	the + adjective-est / the most + adjective	So sánh nhất cần một nhóm từ ba đối tượng trở lên hoặc một phạm vi rõ. The thường đứng trước tính từ so sánh nhất.	2	2026-09-16 07:17:03.313327+00	2026-09-17 09:53:23.022+00
01a0a913-83d9-72cb-b736-19d0e177f1d1	01a0a913-83b8-71cc-92e0-59a0e7c85106	In, on, and at for time	In, on, at với thời gian	in + month/year/part of day · on + day/date · at + clock time	In bao quát khoảng dài, on gắn với ngày cụ thể, còn at chỉ một thời điểm. Các cụm ngoại lệ thông dụng nên được ghi nhớ riêng.	1	2026-09-16 07:17:03.577892+00	2026-09-17 09:53:23.448+00
01a0a913-83e6-72b1-8f19-7edc292c5375	01a0a913-83b8-71cc-92e0-59a0e7c85106	In, on, and at for place	In, on, at với nơi chốn	in + enclosed area · on + surface · at + point	In nhấn mạnh ở bên trong một vùng; on nói sự tiếp xúc với bề mặt. At coi địa điểm như một điểm gặp hoặc hoạt động.	2	2026-09-16 07:17:03.591223+00	2026-09-17 09:53:23.47+00
01a0a913-84da-7197-a53d-29ff54abc32b	01a0a913-84ba-74b3-9b64-b9872b49177e	Quantifiers with countable nouns	Lượng từ với danh từ đếm được	many/few/a few + plural countable noun	Danh từ đếm được phải ở số nhiều sau many, few và a few. A few mang ý tích cực hơn few vì vẫn còn một lượng nhỏ.	1	2026-09-16 07:17:03.835664+00	2026-09-17 09:53:23.902+00
01a0a913-84e7-7167-bfb4-df489b1fe976	01a0a913-84ba-74b3-9b64-b9872b49177e	Quantifiers with uncountable nouns	Lượng từ với danh từ không đếm được	much/little/a little + uncountable noun	Much thường gặp trong câu hỏi và phủ định. A little cho biết vẫn còn một ít, còn little nhấn mạnh lượng đó không đủ.	2	2026-09-16 07:17:03.848751+00	2026-09-17 09:53:23.913+00
01a0a913-85f6-729c-802b-ea6f0aca65d5	01a0a913-85dc-73aa-8f61-b2a6c22be29a	Zero conditional	Điều kiện loại 0	If/When + Present Simple, Present Simple	Hai vế đều dùng hiện tại đơn vì kết quả được xem là luôn đúng khi điều kiện xảy ra. When có thể thay if nếu kết quả chắc chắn.	1	2026-09-16 07:17:04.11964+00	2026-09-17 09:53:24.27+00
01a0a913-8604-76c2-8352-40de5304cf6a	01a0a913-85dc-73aa-8f61-b2a6c22be29a	First conditional	Điều kiện loại 1	If + Present Simple, will + base verb	Mệnh đề if nêu điều kiện có thể xảy ra; mệnh đề chính nêu kết quả tương lai. Có thể thay will bằng can, may hoặc câu mệnh lệnh tùy ý nghĩa.	2	2026-09-16 07:17:04.133102+00	2026-09-17 09:53:24.293+00
01a0a913-871b-7617-a5e8-3b9e32520b65	01a0a913-8706-71a7-a472-ddf21a82db1b	Duration up to now	Khoảng thời gian kéo dài đến hiện tại	have/has been + V-ing + since/for	Cấu trúc cho biết hoạt động bắt đầu trước đây và vẫn tiếp diễn. Since nêu mốc bắt đầu, còn for nêu độ dài thời gian.	1	2026-09-16 07:17:04.41213+00	2026-09-17 09:53:24.597+00
01a0a478-38a0-7090-b691-6fa5a1df829a	01a0a2d1-208d-74be-a817-4d4b7f159a6c	Past verb forms	Dạng quá khứ của động từ	Subject + V2	Động từ có quy tắc thêm -ed. Động từ bất quy tắc đổi dạng riêng (go → went). Cả câu khẳng định đều dùng V2.	1	2026-09-15 09:48:57.376871+00	2026-09-17 09:53:20.522+00
01a0a478-38ac-752f-b640-bc00c08bed2b	01a0a2d1-208d-74be-a817-4d4b7f159a6c	Did for negatives and questions	Dùng did cho phủ định và nghi vấn	did + not + V · Did + subject + V?	Phủ định và câu hỏi dùng did; động từ chính trở lại nguyên mẫu. I didn't see her · Did you finish?	2	2026-09-15 09:48:57.389387+00	2026-09-17 09:53:20.534+00
01a0a478-3934-76e1-82d6-18f1242ba026	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	Have/has + past participle	Have/has + quá khứ phân từ	have/has + V3	Khẳng định: I have finished · She has lived here for years. Phủ định và nghi vấn giữ have/has + V3.	1	2026-09-15 09:48:57.525395+00	2026-09-17 09:53:20.804+00
01a0a913-7dcc-74c7-8e8e-cc5038a3d7a6	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	Indefinite articles	Mạo từ không xác định	a + consonant sound · an + vowel sound	A/an đứng trước danh từ đếm được số ít khi đối tượng chưa xác định. An đi trước âm nguyên âm, vì vậy cách phát âm quyết định lựa chọn.	1	2026-09-16 07:17:02.029444+00	2026-09-17 09:53:21.123+00
01a0a913-8727-7125-b290-965ca5300e65	01a0a913-8706-71a7-a472-ddf21a82db1b	Recent activity with present evidence	Hoạt động gần đây để lại dấu hiệu	have/has been + V-ing	Hoạt động có thể vừa dừng nhưng dấu hiệu vẫn còn ở hiện tại. Cách dùng này tập trung vào quá trình tạo ra kết quả.	2	2026-09-16 07:17:04.424711+00	2026-09-17 09:53:24.609+00
01a0a913-8804-7268-87d8-4bbe1d0fbd7e	01a0a913-87ee-716d-9750-3287ccd8f2e6	Present simple passive	Bị động hiện tại đơn	am/is/are + past participle	Dùng để nói quy trình, sự thật hoặc hành động thường xuyên mà trọng tâm là đối tượng. Chia be theo chủ ngữ mới.	1	2026-09-16 07:17:04.644726+00	2026-09-17 09:53:24.866+00
01a0a913-8810-7581-8473-079d3d69c368	01a0a913-87ee-716d-9750-3287ccd8f2e6	Past simple passive	Bị động quá khứ đơn	was/were + past participle	Dùng khi hành động bị động đã hoàn tất trong quá khứ. Was đi với chủ ngữ số ít; were đi với chủ ngữ số nhiều.	2	2026-09-16 07:17:04.656784+00	2026-09-17 09:53:24.879+00
01a0a913-88fc-760d-8184-102af08f283f	01a0a913-88e3-7053-9a95-361c6bffcf68	Relative pronoun as subject	Đại từ quan hệ làm chủ ngữ	person + who/that + verb · thing + which/that + verb	Khi đại từ quan hệ làm chủ ngữ của mệnh đề sau, không được lược bỏ. Động từ hòa hợp với danh từ được bổ nghĩa.	1	2026-09-16 07:17:04.892635+00	2026-09-17 09:53:25.124+00
01a0a913-8908-77cc-a18d-6d924dccd4e9	01a0a913-88e3-7053-9a95-361c6bffcf68	Relative pronoun as object	Đại từ quan hệ làm tân ngữ	noun + (who/which/that) + subject + verb	Khi sau đại từ quan hệ đã có chủ ngữ, đại từ thường làm tân ngữ và có thể được lược bỏ trong mệnh đề xác định.	2	2026-09-16 07:17:04.911815+00	2026-09-17 09:53:25.137+00
01a0a913-8a12-72f6-92a3-601b7e973ed3	01a0a913-89f9-7169-9047-f7be5382aecc	Verb plus gerund	Động từ đi với V-ing	enjoy/avoid/finish + V-ing · preposition + V-ing	V-ing hoạt động như danh từ sau một số động từ và giới từ. Danh sách động từ cần được học theo cụm thay vì suy đoán.	1	2026-09-16 07:17:05.17073+00	2026-09-17 09:53:25.393+00
01a0a913-8a1e-7002-8626-b611582f3181	01a0a913-89f9-7169-9047-f7be5382aecc	Verb plus infinitive	Động từ đi với to + V	want/decide/hope + to + base verb	To + V thường theo sau các động từ nói về mong muốn, kế hoạch hoặc quyết định. Nó cũng có thể nêu mục đích của hành động.	2	2026-09-16 07:17:05.183488+00	2026-09-17 09:53:25.406+00
01a0a913-8af9-7152-ae29-1ac7bb5b9b6b	01a0a913-8ae1-7410-9119-8b27d1f52485	Reported statements	Tường thuật câu kể	said (that) + clause · told + object + clause	That có thể được lược bỏ trong văn nói. Sau told phải có người nghe; sau said không đặt người nghe trực tiếp nếu không có to.	1	2026-09-16 07:17:05.402902+00	2026-09-17 09:53:25.655+00
01a0a913-8b06-722d-b9a6-b006e6ef8f56	01a0a913-8ae1-7410-9119-8b27d1f52485	Backshift and viewpoint changes	Lùi thì và đổi góc nhìn	Present → Past · will → would · can → could	Khi thuật lại từ một thời điểm quá khứ, ta thường lùi thì một bậc. Đại từ và các từ như today, tomorrow cũng đổi để phù hợp ngữ cảnh mới.	2	2026-09-16 07:17:05.415128+00	2026-09-17 09:53:25.675+00
01a0a478-37f3-7505-8ebc-3f5753b52bd7	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	Affirmative form	Câu khẳng định	Subject + V / V(s/es)	Với I/you/we/they dùng động từ nguyên mẫu. Với he/she/it thêm -s hoặc -es. Ví dụ: I work · She works.	1	2026-09-15 09:48:57.204363+00	2026-09-17 09:53:20.19+00
01a0a478-37fa-7406-be9e-2fdaf54222f1	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	Negatives and questions	Phủ định và nghi vấn	do/does + not + V · Do/Does + subject + V?	Phủ định và câu hỏi dùng trợ động từ do/does; động từ chính luôn nguyên mẫu. He doesn't like… · Does she work here?	2	2026-09-15 09:48:57.211163+00	2026-09-17 09:53:20.205+00
\.


--
-- Data for Name: grammar_topic_relations; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_topic_relations (id, from_topic_id, to_topic_id, relation_type, created_at, updated_at) FROM stdin;
01a0a478-3965-7778-9f20-fa37ab0a9ad4	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	prerequisite	2026-09-15 09:48:57.57407+00	2026-09-15 09:48:57.57407+00
01a0a478-3979-75fe-a799-c2b1065dbf28	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	01a0a2d1-208d-74be-a817-4d4b7f159a6c	confused_with	2026-09-15 09:48:57.594052+00	2026-09-15 09:48:57.594052+00
01a0a478-3987-7567-af9a-7c5f6d5587f1	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	confused_with	2026-09-15 09:48:57.608023+00	2026-09-15 09:48:57.608023+00
01a0a913-8b5d-7324-ae83-af95aba06551	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-7ea1-7118-becd-d45626898a5b	prerequisite	2026-09-16 07:17:05.502378+00	2026-09-16 07:17:05.502378+00
01a0a913-8b69-7116-8ba3-bfa489b786ba	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	related	2026-09-16 07:17:05.513998+00	2026-09-16 07:17:05.513998+00
01a0a913-8b75-771e-b2f0-cd9fd074fe3d	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a2d1-208d-74be-a817-4d4b7f159a6c	prerequisite	2026-09-16 07:17:05.525898+00	2026-09-16 07:17:05.525898+00
01a0a913-8b82-755b-970c-46d3dd10d785	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-81a6-7658-91c8-f2b85c920739	related	2026-09-16 07:17:05.539116+00	2026-09-16 07:17:05.539116+00
01a0a913-8b8d-73fc-8800-e90de9271529	01a0a913-7ea1-7118-becd-d45626898a5b	01a0a913-7f94-70fd-a18c-a0c3df798eff	related	2026-09-16 07:17:05.550293+00	2026-09-16 07:17:05.550293+00
01a0a913-8b99-70b4-b854-6d942c031f9c	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a913-7f94-70fd-a18c-a0c3df798eff	prerequisite	2026-09-16 07:17:05.562004+00	2026-09-16 07:17:05.562004+00
01a0a913-8ba8-749a-b76f-1525b4469644	01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	01a0a913-8706-71a7-a472-ddf21a82db1b	prerequisite	2026-09-16 07:17:05.576537+00	2026-09-16 07:17:05.576537+00
01a0a913-8bb4-767b-ae3a-a639b834bc0d	01a0a913-7ea1-7118-becd-d45626898a5b	01a0a913-8706-71a7-a472-ddf21a82db1b	confused_with	2026-09-16 07:17:05.588631+00	2026-09-16 07:17:05.588631+00
01a0a913-8bc0-77cb-96ca-47cda376216e	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a913-80a5-72b5-9331-8c651514ab62	related	2026-09-16 07:17:05.600885+00	2026-09-16 07:17:05.600885+00
01a0a913-8bcf-7512-8a1f-6745b9cd2be5	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-85dc-73aa-8f61-b2a6c22be29a	prerequisite	2026-09-16 07:17:05.622024+00	2026-09-16 07:17:05.622024+00
01a0a913-8be4-735d-8e7b-6d21525001f9	01a0a913-80a5-72b5-9331-8c651514ab62	01a0a913-85dc-73aa-8f61-b2a6c22be29a	related	2026-09-16 07:17:05.637051+00	2026-09-16 07:17:05.637051+00
01a0a913-8bf0-7258-b88d-e944084c81ff	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a913-87ee-716d-9750-3287ccd8f2e6	prerequisite	2026-09-16 07:17:05.648615+00	2026-09-16 07:17:05.648615+00
01a0a913-8bfc-71a3-8d4a-4b89ac94f05d	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-88e3-7053-9a95-361c6bffcf68	prerequisite	2026-09-16 07:17:05.661338+00	2026-09-16 07:17:05.661338+00
01a0a913-8c09-74f2-8cf4-df69529186e7	01a0a2d1-1fcf-7373-bb9a-3b604b12e047	01a0a913-89f9-7169-9047-f7be5382aecc	related	2026-09-16 07:17:05.673945+00	2026-09-16 07:17:05.673945+00
01a0a913-8c15-7263-8024-e07092dc8bfa	01a0a2d1-208d-74be-a817-4d4b7f159a6c	01a0a913-8ae1-7410-9119-8b27d1f52485	prerequisite	2026-09-16 07:17:05.685497+00	2026-09-16 07:17:05.685497+00
01a0a913-8c21-73fb-b203-3f7721aa7a01	01a0a913-82ab-74cc-9a37-de2a25e7cea7	01a0a913-84ba-74b3-9b64-b9872b49177e	related	2026-09-16 07:17:05.697557+00	2026-09-16 07:17:05.697557+00
01a0a913-8c2d-74ff-a39a-c1a22e0801b7	01a0a913-83b8-71cc-92e0-59a0e7c85106	01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	related	2026-09-16 07:17:05.709461+00	2026-09-16 07:17:05.709461+00
\.


--
-- Data for Name: grammar_topics; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.grammar_topics (id, slug, level, quiz_id, created_at, updated_at, title_en, title_vi, category, parent_id, order_index, summary_vi, status, deleted_at) FROM stdin;
01a0a2d1-20e7-7562-8be0-1a33b6d50bf1	present-perfect	B1	01a0a2d1-2091-71f5-814e-bcfba328283a	2026-09-15 02:06:49.576868+00	2026-09-17 09:53:20.777+00	Present Perfect	Thì hiện tại hoàn thành	verb_tenses	\N	12	Dùng thì hiện tại hoàn thành để nói về trải nghiệm hoặc kết quả vẫn liên quan đến hiện tại, thường không nêu thời điểm cụ thể.	published	\N
01a0a2d1-1fcf-7373-bb9a-3b604b12e047	present-simple	A1	01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	2026-09-15 02:06:49.296194+00	2026-09-17 09:53:20.128+00	Present Simple	Thì hiện tại đơn	verb_tenses	\N	1	Dùng thì hiện tại đơn để nói về thói quen, lịch trình cố định và sự thật luôn đúng.	published	\N
01a0a2d1-208d-74be-a817-4d4b7f159a6c	past-simple	A2	01a0a2d1-2041-7599-9d22-ce690ceb7d4f	2026-09-15 02:06:49.486065+00	2026-09-17 09:53:20.495+00	Past Simple	Thì quá khứ đơn	verb_tenses	\N	4	Dùng thì quá khứ đơn để kể sự việc đã xảy ra và kết thúc tại một thời điểm cụ thể trong quá khứ.	published	\N
01a0a913-7f94-70fd-a18c-a0c3df798eff	past-continuous	A2	01a0a3df-62e3-7631-9fb6-26568475700a	2026-09-16 07:17:02.485119+00	2026-09-17 09:53:21.854+00	Past Continuous	Thì quá khứ tiếp diễn	verb_tenses	\N	5	Thì quá khứ tiếp diễn mô tả một hành động đang diễn ra tại một thời điểm trong quá khứ. Nó thường tạo bối cảnh cho một hành động ngắn hơn xen vào.	published	\N
01a0a913-84ba-74b3-9b64-b9872b49177e	quantifiers	A2	01a0a3df-64e2-7041-a975-cbf0d521ac06	2026-09-16 07:17:03.8033+00	2026-09-17 09:53:23.864+00	Quantifiers	Từ chỉ số lượng	other	\N	10	Từ chỉ số lượng cho biết nhiều, ít hoặc một phần của danh từ. Việc chọn từ phụ thuộc danh từ đếm được hay không đếm được và sắc thái khẳng định hay phủ định.	published	\N
01a0a913-89f9-7169-9047-f7be5382aecc	gerunds-infinitives	B1	01a0a3df-6488-70f6-88d1-c374b080c5bd	2026-09-16 07:17:05.146268+00	2026-09-17 09:53:25.36+00	Gerunds and Infinitives	Danh động từ và động từ nguyên mẫu có to	other	\N	16	Một số động từ đi với V-ing, một số đi với to + động từ nguyên mẫu, và một số dùng được cả hai nhưng có thể đổi nghĩa. Cách chắc chắn nhất là học động từ theo cụm.	published	\N
01a0a913-80a5-72b5-9331-8c651514ab62	future-will-going-to	A2	01a0a913-8006-7187-987e-07a545489f51	2026-09-16 07:17:02.758625+00	2026-09-17 09:53:22.221+00	Future: Will and Be Going To	Tương lai với will và be going to	verb_tenses	\N	6	Will thường diễn tả quyết định ngay lúc nói, lời hứa hoặc dự đoán mang tính ý kiến. Be going to dùng cho dự định đã có và dự đoán dựa trên dấu hiệu hiện tại.	published	\N
01a0a913-81a6-7658-91c8-f2b85c920739	modals-can-could	A2	01a0a913-8113-75e5-886f-87f7517e9fb8	2026-09-16 07:17:03.015+00	2026-09-17 09:53:22.589+00	Can and Could	Động từ khuyết thiếu can và could	modals	\N	7	Can và could diễn tả khả năng, sự cho phép và lời yêu cầu. Could còn nói khả năng trong quá khứ hoặc giúp lời đề nghị lịch sự hơn.	published	\N
01a0a913-85dc-73aa-8f61-b2a6c22be29a	conditionals-zero-first	A2	01a0a913-8529-728c-a2c9-f4a5b0bf5003	2026-09-16 07:17:04.093113+00	2026-09-17 09:53:24.242+00	Zero and First Conditionals	Câu điều kiện loại 0 và loại 1	clauses	\N	11	Câu điều kiện loại 0 nói về sự thật hoặc kết quả luôn xảy ra. Loại 1 nói về khả năng thực tế trong tương lai và kết quả có thể xảy ra.	published	\N
01a0a913-8706-71a7-a472-ddf21a82db1b	present-perfect-continuous	B1	01a0a913-8666-7160-a501-a2947406376a	2026-09-16 07:17:04.390714+00	2026-09-17 09:53:24.572+00	Present Perfect Continuous	Thì hiện tại hoàn thành tiếp diễn	verb_tenses	\N	13	Thì hiện tại hoàn thành tiếp diễn nhấn mạnh quá trình bắt đầu trong quá khứ và còn tiếp tục hoặc vừa dừng nhưng để lại dấu hiệu. Cấu trúc là have/has been + V-ing.	published	\N
01a0a913-87ee-716d-9750-3287ccd8f2e6	passive-present-past	B1	01a0a913-8769-7432-8ef1-b00e8849eca5	2026-09-16 07:17:04.623349+00	2026-09-17 09:53:24.845+00	Present and Past Passive	Câu bị động ở hiện tại và quá khứ	verb_tenses	\N	14	Câu bị động tập trung vào đối tượng chịu tác động hoặc kết quả thay vì người thực hiện. Hiện tại dùng am/is/are + V3; quá khứ dùng was/were + V3.	published	\N
01a0a913-88e3-7053-9a95-361c6bffcf68	relative-clauses	B1	01a0a3df-63e6-779a-8f5f-07064f6bd953	2026-09-16 07:17:04.868575+00	2026-09-17 09:53:25.103+00	Relative Clauses	Mệnh đề quan hệ	clauses	\N	15	Mệnh đề quan hệ bổ sung thông tin cho danh từ mà không cần tách thành câu mới. Who thường thay người, which thay vật và that có thể thay cả hai trong mệnh đề xác định.	published	\N
01a0a913-8ae1-7410-9119-8b27d1f52485	reported-speech	B1	01a0a3df-6439-73e3-b84d-b92d510a876b	2026-09-16 07:17:05.378129+00	2026-09-17 09:53:25.637+00	Reported Speech	Câu tường thuật	clauses	\N	17	Câu tường thuật kể lại lời nói mà không lặp nguyên văn. Khi động từ tường thuật ở quá khứ, thì, đại từ và từ chỉ thời gian thường thay đổi theo góc nhìn mới.	published	\N
01a0a913-7da4-7701-bfa0-0f96e8cc4f3b	articles	A1	01a0a2d1-22f6-755b-bfa4-a25addd37628	2026-09-16 07:17:01.989744+00	2026-09-17 09:53:21.083+00	Articles	Mạo từ a, an, the	articles	\N	2	A/an giới thiệu một danh từ đếm được số ít chưa xác định; the chỉ người hoặc vật đã xác định. Danh từ số nhiều và không đếm được đôi khi không cần mạo từ.	published	\N
01a0a913-7ea1-7118-becd-d45626898a5b	present-continuous	A1	01a0a2d1-1fd8-7047-afb9-07f25f2cc588	2026-09-16 07:17:02.242182+00	2026-09-17 09:53:21.477+00	Present Continuous	Thì hiện tại tiếp diễn	verb_tenses	\N	3	Thì hiện tại tiếp diễn diễn tả việc đang xảy ra quanh thời điểm nói hoặc một tình huống tạm thời. Cấu trúc chính là be + động từ thêm -ing.	published	\N
01a0a913-82ab-74cc-9a37-de2a25e7cea7	comparatives-superlatives	A2	01a0a913-8214-741e-aba5-824d2b78b7fd	2026-09-16 07:17:03.276512+00	2026-09-17 09:53:22.944+00	Comparatives and Superlatives	So sánh hơn và so sánh nhất	other	\N	8	So sánh hơn đặt hai đối tượng cạnh nhau; so sánh nhất chọn một đối tượng nổi bật trong nhóm. Dạng từ phụ thuộc độ dài và chính tả của tính từ.	published	\N
01a0a913-83b8-71cc-92e0-59a0e7c85106	prepositions-time-place	A2	01a0a3df-655f-7376-993b-c32b844f0d51	2026-09-16 07:17:03.545946+00	2026-09-17 09:53:23.398+00	Prepositions of Time and Place	Giới từ chỉ thời gian và nơi chốn	prepositions	\N	9	In, on và at giúp xác định thời gian hoặc vị trí với mức độ cụ thể khác nhau. Người học nên ghi nhớ theo cụm và hình dung phạm vi từ rộng đến điểm.	published	\N
\.


--
-- Data for Name: lesson_vocabularies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lesson_vocabularies (id, lesson_id, vocabulary_id, order_index, created_at, updated_at) FROM stdin;
01a0a2d1-2540-70b5-9340-6d71463664fc	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-508d22fbe584	1	2026-09-15 02:06:50.689487+00	2026-09-17 09:53:26.794+00
01a0a2d1-2546-72ef-b4c7-dc6c12a7d113	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-58341d55d564	2	2026-09-15 02:06:50.696134+00	2026-09-17 09:53:26.805+00
01a0a2d1-254d-7768-88c9-5301ace5504e	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-62b2b27b9113	3	2026-09-15 02:06:50.701813+00	2026-09-17 09:53:26.817+00
01a0a2d1-2557-75cf-b7de-91ef8852b8d6	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-6c7080ddabc4	4	2026-09-15 02:06:50.71195+00	2026-09-17 09:53:26.828+00
01a0a2d1-255d-76d6-a5f7-ac528b76535f	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-709550cabec2	5	2026-09-15 02:06:50.717885+00	2026-09-17 09:53:26.837+00
01a0a2d1-2571-76f8-ac84-6454d856a325	01a0a2d1-2564-75a3-8c0d-7a52ea2c82ed	01a0a2d1-1d9d-7087-8671-6493260e0a1e	1	2026-09-15 02:06:50.737875+00	2026-09-17 09:53:26.874+00
01a0a2d1-2576-71a5-88c6-e8060f1413bb	01a0a2d1-2564-75a3-8c0d-7a52ea2c82ed	01a0a2d1-1d9d-7087-8671-5e6df3573bd9	2	2026-09-15 02:06:50.742973+00	2026-09-17 09:53:26.886+00
01a0a2d1-2583-7693-9d51-182daecae4c1	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-3bbbff64de28	0	2026-09-15 02:06:50.755856+00	2026-09-17 09:53:26.912+00
01a0a2d1-2588-7643-a916-f1543c1156b2	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-375b2b2b42f8	1	2026-09-15 02:06:50.760667+00	2026-09-17 09:53:26.923+00
01a0a2d1-258c-7051-bd9f-cd20ed96ec4f	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-3f9eb9f9bfe7	2	2026-09-15 02:06:50.765286+00	2026-09-17 09:53:26.935+00
01a0a2d1-2591-778c-bc0d-b1d90b0aed52	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-4103b3ec0d2c	3	2026-09-15 02:06:50.769762+00	2026-09-17 09:53:26.941+00
01a0a2d1-2595-74e9-90b1-be796cf81378	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-450ba78bdf43	4	2026-09-15 02:06:50.774544+00	2026-09-17 09:53:26.953+00
01a0a2d1-259b-768f-9987-65ad63b80a35	01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-1d9c-71ba-a344-4aa86d714378	5	2026-09-15 02:06:50.780427+00	2026-09-17 09:53:26.964+00
01a0a2d1-25a8-730d-b156-1f4fd8b584af	01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-1d9d-7087-8671-7585a34191e5	0	2026-09-15 02:06:50.794052+00	2026-09-17 09:53:26.996+00
01a0a2d1-25af-7610-8f42-f7aef1f51d53	01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-1d9d-7087-8671-793a6a900848	1	2026-09-15 02:06:50.799419+00	2026-09-17 09:53:27.009+00
01a0a2d1-25b3-70ff-80ae-d5701519538a	01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-1d9d-7087-8671-7c625ce12029	2	2026-09-15 02:06:50.804016+00	2026-09-17 09:53:27.021+00
01a0a2d1-25b9-7047-8174-dff12a845302	01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-1d9d-7087-8671-81ab42dc4a94	3	2026-09-15 02:06:50.809718+00	2026-09-17 09:53:27.026+00
01a0a2d1-25bd-7067-8e7a-923e17c13a03	01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-1d9d-7087-8671-8495925c117a	4	2026-09-15 02:06:50.814403+00	2026-09-17 09:53:27.038+00
01a0a2d1-25c7-75fb-8115-af84badf172c	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-8b9a20839eba	0	2026-09-15 02:06:50.824609+00	2026-09-17 09:53:27.07+00
01a0a2d1-25cd-72e5-9965-ffb8030f6648	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-8ee7bb203cf3	1	2026-09-15 02:06:50.830525+00	2026-09-17 09:53:27.075+00
01a0a2d1-25d3-7720-a3b3-3c752cd62c50	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-9012364e42dd	2	2026-09-15 02:06:50.836289+00	2026-09-17 09:53:27.095+00
01a0a2d1-25d8-71cf-b5f0-85353e324f26	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-968b308dad44	3	2026-09-15 02:06:50.841019+00	2026-09-17 09:53:27.107+00
01a0a2d1-25dd-77d7-af19-fa476e47a464	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-9a64f21aec85	4	2026-09-15 02:06:50.84616+00	2026-09-17 09:53:27.119+00
01a0a2d1-25e2-71a1-ac9a-3a4bd9e55be4	01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-1d9d-7087-8671-9c14d1236225	5	2026-09-15 02:06:50.850863+00	2026-09-17 09:53:27.124+00
01a0a2d1-25ec-7585-ab9a-3c6aad612c92	01a0a2d1-25e7-737c-baa8-14d210221177	01a0a2d1-1d9d-7087-8671-a1f11a2fe18c	0	2026-09-15 02:06:50.861444+00	2026-09-17 09:53:27.149+00
01a0a2d1-25f2-7130-945a-44b2ac9a618e	01a0a2d1-25e7-737c-baa8-14d210221177	01a0a2d1-1d9d-7087-8671-a51f11d4364b	1	2026-09-15 02:06:50.866685+00	2026-09-17 09:53:27.161+00
01a0a2d1-25f7-717d-9eea-d57ca5d88acc	01a0a2d1-25e7-737c-baa8-14d210221177	01a0a2d1-1d9d-7087-8671-a99657868a25	2	2026-09-15 02:06:50.871865+00	2026-09-17 09:53:27.173+00
01a0a2d1-25fc-76a0-b4ac-b7c16822db96	01a0a2d1-25e7-737c-baa8-14d210221177	01a0a2d1-1d9d-7087-8671-adc93abe3498	3	2026-09-15 02:06:50.877082+00	2026-09-17 09:53:27.185+00
01a0a2d1-260c-7566-b374-3f4e56d8157c	01a0a2d1-2607-73d5-9afb-905400d7e3cc	01a0a2d1-1d9d-7087-8671-adc93abe3498	0	2026-09-15 02:06:50.893129+00	2026-09-17 09:53:27.21+00
01a0a2d1-261d-701c-b935-44247f28983c	01a0a2d1-2617-709a-abe2-7a2ba206dd0e	01a0a2d1-1d9d-7087-8671-8b9a20839eba	0	2026-09-15 02:06:50.910109+00	2026-09-17 09:53:27.246+00
01a0a2d1-2622-73ea-987d-46415b4d463a	01a0a2d1-2617-709a-abe2-7a2ba206dd0e	01a0a2d1-1d9d-7087-8671-81ab42dc4a94	1	2026-09-15 02:06:50.915871+00	2026-09-17 09:53:27.258+00
01a0a2d1-2628-712a-af7e-04fb91c165bb	01a0a2d1-2617-709a-abe2-7a2ba206dd0e	01a0a2d1-1d9d-7087-8671-adc93abe3498	2	2026-09-15 02:06:50.921635+00	2026-09-17 09:53:27.278+00
01a0a2d1-2633-7072-853f-d800728c305d	01a0a2d1-2617-709a-abe2-7a2ba206dd0e	01a0a2d1-1d9d-7087-8671-a99657868a25	3	2026-09-15 02:06:50.932925+00	2026-09-17 09:53:27.291+00
01a0a2d1-2641-76e5-b308-feb657bb2e7f	01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-1d9d-7087-8671-b52b0a54f07d	0	2026-09-15 02:06:50.947073+00	2026-09-17 09:53:27.315+00
01a0a2d1-2648-7579-8458-a604743bcd62	01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-1d9d-7087-8671-b99e961fb659	1	2026-09-15 02:06:50.953436+00	2026-09-17 09:53:27.32+00
01a0a2d1-264f-707c-a0d2-1c44ddfb0ffc	01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-1d9d-7087-8671-bec0d36ac7e6	2	2026-09-15 02:06:50.960263+00	2026-09-17 09:53:27.332+00
01a0a2d1-2655-774a-9595-198d319fe6b6	01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-1d9d-7087-8671-c0ef25d2695e	3	2026-09-15 02:06:50.967402+00	2026-09-17 09:53:27.343+00
01a0a2d1-265c-70bf-beda-1c5ce6b8383b	01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-1d9d-7087-8671-c7a23fcba4c7	4	2026-09-15 02:06:50.973367+00	2026-09-17 09:53:27.355+00
01a0a2d1-2669-706c-a378-29015ea3ba60	01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-1d9d-7087-8671-c86c6b925f7c	0	2026-09-15 02:06:50.986456+00	2026-09-17 09:53:27.376+00
01a0a2d1-2670-7142-b45a-e35969841876	01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-1d9e-7539-bba7-5fc140dddebc	1	2026-09-15 02:06:50.993492+00	2026-09-17 09:53:27.388+00
01a0a2d1-2676-75a9-ae76-da0416d7137c	01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-1d9e-7539-bba7-60c9ab002603	2	2026-09-15 02:06:50.999522+00	2026-09-17 09:53:27.393+00
01a0a2d1-267c-7066-b573-5d60e634b3fa	01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-1d9d-7087-8671-6912503ba560	3	2026-09-15 02:06:51.005036+00	2026-09-17 09:53:27.404+00
01a0a2d1-2684-72fc-9d80-b9c58f71e01c	01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-1d9e-7539-bba7-664430bb8d9d	4	2026-09-15 02:06:51.01402+00	2026-09-17 09:53:27.413+00
01a0a2d1-2693-77ff-bbdf-a1c4e0055dec	01a0a2d1-268b-754c-b7bb-c7d2c2dfc675	01a0a2d1-1d9e-7539-bba7-76fc13f46af7	0	2026-09-15 02:06:51.028045+00	2026-09-17 09:53:27.437+00
01a0a2d1-2698-7754-a2e9-26764ac0ed85	01a0a2d1-268b-754c-b7bb-c7d2c2dfc675	01a0a2d1-1d9e-7539-bba7-7e9e6550ca5f	1	2026-09-15 02:06:51.033504+00	2026-09-17 09:53:27.443+00
01a0a2d1-26a5-744c-9bc2-ed8023ad24ed	01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-1d9e-7539-bba7-69452b4f7c12	0	2026-09-15 02:06:51.046308+00	2026-09-17 09:53:27.467+00
01a0a2d1-26aa-71bb-a8b0-fb96c2afead0	01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-1d9e-7539-bba7-6d0ba63effe2	1	2026-09-15 02:06:51.05064+00	2026-09-17 09:53:27.478+00
01a0a2d1-26ae-7346-bf50-5786d3947f56	01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-1d9e-7539-bba7-80b96ebff2dc	2	2026-09-15 02:06:51.054927+00	2026-09-17 09:53:27.49+00
01a0a2d1-26b2-73dd-aa8a-204461032492	01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-1d9e-7539-bba7-7e9e6550ca5f	3	2026-09-15 02:06:51.059641+00	2026-09-17 09:53:27.502+00
01a0a2d1-26b8-726b-bb6c-d301c512ffee	01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-1d9e-7539-bba7-76fc13f46af7	4	2026-09-15 02:06:51.064347+00	2026-09-17 09:53:27.511+00
01a0a2d1-26c0-7365-a5cc-1ee3d8a4ed9e	01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-1d9e-7539-bba7-71e141f2ed72	0	2026-09-15 02:06:51.073404+00	2026-09-17 09:53:27.528+00
01a0a2d1-26c6-7145-96e5-ff40c3c7a7d0	01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-1d9e-7539-bba7-664430bb8d9d	1	2026-09-15 02:06:51.07862+00	2026-09-17 09:53:27.54+00
01a0a2d1-26ca-744a-83ba-c896bca1eb4a	01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-1d9f-76cd-bdf6-83f794e954f3	2	2026-09-15 02:06:51.083515+00	2026-09-17 09:53:27.551+00
01a0a2d1-26d5-7088-a7d7-6a6aec6351bf	01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-1d9f-76cd-bdf6-8a5a7e5269d6	4	2026-09-15 02:06:51.095169+00	2026-09-17 09:53:27.565+00
01a0a2d1-26e1-7121-a1db-43e373a17b39	01a0a2d1-26dc-71d3-9cb2-26fef850b23b	01a0a2d1-1d9e-7539-bba7-c3cd324ed76b	0	2026-09-15 02:06:51.106265+00	2026-09-17 09:53:27.589+00
01a0a2d1-26e6-726f-9abf-d7933be2b2b2	01a0a2d1-26dc-71d3-9cb2-26fef850b23b	01a0a2d1-1d9c-71ba-a344-375b2b2b42f8	1	2026-09-15 02:06:51.111019+00	2026-09-17 09:53:27.6+00
01a0a2d1-2706-70d3-87b2-0ca8a419bcb6	01a0a2d1-2701-769a-9ccf-c0ad47474990	01a0a2d1-1d9e-7539-bba7-c43e5c5e93f3	0	2026-09-15 02:06:51.143031+00	2026-09-17 09:53:27.662+00
01a0a2d1-270a-7109-8f8e-2150ae80d2f2	01a0a2d1-2701-769a-9ccf-c0ad47474990	01a0a2d1-1d9e-7539-bba7-cd915316296d	1	2026-09-15 02:06:51.147225+00	2026-09-17 09:53:27.674+00
01a0a2d1-270f-7618-9bd7-aeba7bdfcf2e	01a0a2d1-2701-769a-9ccf-c0ad47474990	01a0a2d1-1d9f-76cd-bdf6-331eab7b929c	2	2026-09-15 02:06:51.151594+00	2026-09-17 09:53:27.687+00
01a0a2d1-2718-76b4-9d5a-c833609c9cc5	01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-1d9e-7539-bba7-d37cea0751ee	0	2026-09-15 02:06:51.161012+00	2026-09-17 09:53:27.71+00
01a0a2d1-271d-722c-9a29-f9c268b7d26e	01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-1d9e-7539-bba7-d40d52d869fa	1	2026-09-15 02:06:51.16554+00	2026-09-17 09:53:27.719+00
01a0a2d1-2721-74cd-8c26-f27f21210e1f	01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-1d9e-7539-bba7-dabd67373697	2	2026-09-15 02:06:51.170223+00	2026-09-17 09:53:27.731+00
01a0a2d1-272c-77a4-a67b-78d0e7ce8cb0	01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-1d9f-76cd-bdf6-34f7ee7d3ec9	4	2026-09-15 02:06:51.180628+00	2026-09-17 09:53:27.749+00
01a0a2d1-2738-70f1-a3a8-54b0394dd46f	01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-1d9e-7539-bba7-c8c5f78d2fdf	0	2026-09-15 02:06:51.193389+00	2026-09-17 09:53:27.771+00
01a0a2d1-251f-775f-85ab-8f2b7bf14cf4	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9c-71ba-a344-59ad2d9d8afa	3	2026-09-15 02:06:50.656396+00	2026-09-17 09:53:26.731+00
01a0a2d1-24ed-736b-8b3a-7c5929fc3b51	01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-1d9b-7549-8636-74300652b918	1	2026-09-15 02:06:50.605896+00	2026-09-17 09:53:26.642+00
01a0a2d1-24f2-713f-9b81-b61e693ce75c	01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-1d9c-71ba-a344-267ede250d4c	2	2026-09-15 02:06:50.611464+00	2026-09-17 09:53:26.654+00
01a0a2d1-24f9-77f7-9ace-7c5e25c891e0	01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-1d9c-71ba-a344-2bf0ae9a3def	3	2026-09-15 02:06:50.618272+00	2026-09-17 09:53:26.666+00
01a0a2d1-24ff-71bd-90a6-89a394cb11ba	01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-1d9c-71ba-a344-2c560c431205	4	2026-09-15 02:06:50.625305+00	2026-09-17 09:53:26.678+00
01a0a2d1-250e-72dd-97de-e51c8d866d12	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9c-71ba-a344-4c3ec6e9c545	0	2026-09-15 02:06:50.639429+00	2026-09-17 09:53:26.703+00
01a0a2d1-2514-71cf-8fad-7baede10a43b	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9c-71ba-a344-52790492acb7	1	2026-09-15 02:06:50.644802+00	2026-09-17 09:53:26.708+00
01a0a2d1-2519-7765-a01c-b3255fffc0d4	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9c-71ba-a344-542a1b3f6810	2	2026-09-15 02:06:50.65072+00	2026-09-17 09:53:26.719+00
01a0a2d1-2525-766c-8101-861fc34331e6	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9d-7087-8671-3417eb212f93	4	2026-09-15 02:06:50.662296+00	2026-09-17 09:53:26.739+00
01a0a2d1-252b-71c1-8be7-9d3d93c3c8df	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9d-7087-8671-387a48d55a7d	5	2026-09-15 02:06:50.667959+00	2026-09-17 09:53:26.752+00
01a0a2d1-2530-706c-bd2f-388070e9c2fa	01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-1d9d-7087-8671-3e101fbfdf7a	6	2026-09-15 02:06:50.672881+00	2026-09-17 09:53:26.757+00
01a0a2d1-253b-72ea-b97e-2c026ed7f56a	01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-1d9d-7087-8671-4dd70ce36b51	0	2026-09-15 02:06:50.684382+00	2026-09-17 09:53:26.782+00
01a0a2d1-24e4-709b-9ba9-77f627c35f9e	01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-1d9a-731b-994c-dbddbdfba368	0	2026-09-15 02:06:50.597618+00	2026-09-17 09:53:26.629+00
01a0a2d1-256b-75ab-aeb3-2b0e8f70903a	01a0a2d1-2564-75a3-8c0d-7a52ea2c82ed	01a0a2d1-1d9d-7087-8671-6c7080ddabc4	0	2026-09-15 02:06:50.732074+00	2026-09-17 09:53:26.862+00
01a0a2d1-2611-7543-acb4-12144c35b9dc	01a0a2d1-2607-73d5-9afb-905400d7e3cc	01a0a2d1-1d9d-7087-8671-7585a34191e5	1	2026-09-15 02:06:50.898666+00	2026-09-17 09:53:27.222+00
01a0a2d1-26d0-7258-9387-ceec08645ce9	01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-1d9f-76cd-bdf6-862c32b1b1e6	3	2026-09-15 02:06:51.089633+00	2026-09-17 09:53:27.56+00
01a0a2d1-2726-746f-8f92-79800eea3ce3	01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-1d9f-76cd-bdf6-3aa402909293	3	2026-09-15 02:06:51.175488+00	2026-09-17 09:53:27.744+00
01a0a2d1-273d-7088-adad-223b8713dc59	01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-1d9e-7539-bba7-e028af34422e	1	2026-09-15 02:06:51.198049+00	2026-09-17 09:53:27.78+00
01a0a2d1-2742-74b0-9f67-11b17ac04191	01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-1d9f-76cd-bdf6-405d8a5840e1	2	2026-09-15 02:06:51.20336+00	2026-09-17 09:53:27.793+00
01a0a2d1-2747-7172-818e-0baccef13403	01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-1d9e-7539-bba7-dfa957b2f221	3	2026-09-15 02:06:51.208219+00	2026-09-17 09:53:27.804+00
01a0a2d1-274c-714a-a1b3-21f3a0c41898	01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-1d9f-76cd-bdf6-467da12b4976	4	2026-09-15 02:06:51.213304+00	2026-09-17 09:53:27.809+00
01a0a2d1-275a-7056-9288-d3fabbab6f18	01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-1d9e-7539-bba7-dabd67373697	0	2026-09-15 02:06:51.227509+00	2026-09-17 09:53:27.829+00
01a0a2d1-275f-74f8-87c6-863ce3e55fc2	01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-1d9e-7539-bba7-93043459bf9b	1	2026-09-15 02:06:51.232565+00	2026-09-17 09:53:27.835+00
01a0a2d1-2764-7338-9017-1abc66f99bc8	01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-1d9e-7539-bba7-97f3a0e1cb58	2	2026-09-15 02:06:51.237485+00	2026-09-17 09:53:27.853+00
01a0a2d1-2769-7427-9c1a-67f75df3d096	01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-1d9e-7539-bba7-9c9c46a6b896	3	2026-09-15 02:06:51.242377+00	2026-09-17 09:53:27.858+00
01a0a2d1-276e-756a-a8fd-0f8885cfd1d5	01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-1d9e-7539-bba7-8ef79cd7ffd4	4	2026-09-15 02:06:51.247082+00	2026-09-17 09:53:27.869+00
01a0a2d1-2777-7506-b58c-3e119fca0e0d	01a0a2d1-2773-77a2-95dd-d4f840f4330a	01a0a2d1-1d9f-76cd-bdf6-3fbdadffbeaa	0	2026-09-15 02:06:51.25642+00	2026-09-17 09:53:27.89+00
01a0a2d1-277c-741b-bb8b-c528307079cb	01a0a2d1-2773-77a2-95dd-d4f840f4330a	01a0a2d1-1d9e-7539-bba7-e65781292348	1	2026-09-15 02:06:51.261336+00	2026-09-17 09:53:27.895+00
01a0a2d1-2781-77e6-96c3-76881093a16e	01a0a2d1-2773-77a2-95dd-d4f840f4330a	01a0a2d1-1d9d-7087-8671-7585a34191e5	2	2026-09-15 02:06:51.266022+00	2026-09-17 09:53:27.906+00
01a0a2d1-2786-707b-976a-6057199394f4	01a0a2d1-2773-77a2-95dd-d4f840f4330a	01a0a2d1-1d9e-7539-bba7-d37cea0751ee	3	2026-09-15 02:06:51.271014+00	2026-09-17 09:53:27.915+00
\.


--
-- Data for Name: lessons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.lessons (id, course_id, order_index, slug, title, skill, estimated_minutes, content, created_at, updated_at) FROM stdin;
01a0a2d1-25c2-7109-89c4-8c4815166965	01a0a2d1-235f-7781-bc24-29ad9c00396f	1	talking-about-feelings	Talking About Feelings	vocabulary	10	[{"text": "Describe emotions more precisely than just \\"good\\" or \\"bad\\".", "type": "objective"}, {"type": "explanation", "markdown": "Instead of always saying \\"I feel bad\\", try more specific words: *nervous* before something stressful, *frustrated* when something goes wrong, *relieved* once it's over."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-8b9a20839eba", "01a0a2d1-1d9d-7087-8671-8ee7bb203cf3", "01a0a2d1-1d9d-7087-8671-9012364e42dd", "01a0a2d1-1d9d-7087-8671-968b308dad44", "01a0a2d1-1d9d-7087-8671-9a64f21aec85", "01a0a2d1-1d9d-7087-8671-9c14d1236225"]}, {"type": "examples", "items": [{"en": "I always feel nervous before an interview.", "vi": "Tôi luôn cảm thấy hồi hộp trước buổi phỏng vấn."}, {"en": "I was relieved to hear the good news.", "vi": "Tôi cảm thấy nhẹ nhõm khi nghe tin tốt."}]}, {"type": "exercise", "quizId": "01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a"}]	2026-09-15 02:06:50.819625+00	2026-09-17 09:53:27.057+00
01a0a2d1-2508-7676-b1dd-d2e7b03989cf	01a0a2d1-2359-71bd-bf1c-d44dc1857384	1	family-and-home	Family and Home	vocabulary	10	[{"text": "Talk about the people you live with and describe your home.", "type": "objective"}, {"type": "explanation", "markdown": "Family words like *sibling* and *relative* let you describe your household without repeating \\"brother\\", \\"sister\\", \\"cousin\\" every time. Combine them with simple adjectives like *tidy* to describe your home."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9c-71ba-a344-4c3ec6e9c545", "01a0a2d1-1d9c-71ba-a344-52790492acb7", "01a0a2d1-1d9c-71ba-a344-542a1b3f6810", "01a0a2d1-1d9c-71ba-a344-59ad2d9d8afa", "01a0a2d1-1d9d-7087-8671-3417eb212f93", "01a0a2d1-1d9d-7087-8671-387a48d55a7d", "01a0a2d1-1d9d-7087-8671-3e101fbfdf7a"]}, {"type": "examples", "items": [{"en": "There are four people in my household.", "vi": "Gia đình tôi có bốn người."}, {"en": "My neighbor is very friendly.", "vi": "Hàng xóm của tôi rất thân thiện."}]}, {"type": "exercise", "quizId": "01a0a2d1-1dfa-7577-8521-f7ec48a4ed37"}]	2026-09-15 02:06:50.633348+00	2026-09-17 09:53:26.683+00
01a0a2d1-2535-7044-b4a0-9804f3dcc33a	01a0a2d1-2359-71bd-bf1c-d44dc1857384	2	food-and-cooking	Food and Cooking	vocabulary	12	[{"text": "Describe meals, ingredients, and flavors.", "type": "objective"}, {"type": "explanation", "markdown": "When you talk about food, you often need to describe **what's in it** (*ingredient*, *recipe*) and **how it tastes** (*delicious*, *spicy*). Try describing your favorite dish using at least two of today's words."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-4dd70ce36b51", "01a0a2d1-1d9d-7087-8671-508d22fbe584", "01a0a2d1-1d9d-7087-8671-58341d55d564", "01a0a2d1-1d9d-7087-8671-62b2b27b9113", "01a0a2d1-1d9d-7087-8671-6c7080ddabc4", "01a0a2d1-1d9d-7087-8671-709550cabec2"]}, {"type": "examples", "items": [{"en": "Flour is the main ingredient in bread.", "vi": "Bột mì là nguyên liệu chính trong bánh mì."}, {"en": "This soup has a spicy flavor.", "vi": "Món súp này có vị cay."}]}, {"type": "exercise", "quizId": "01a0a2d1-1dfa-7577-8521-f7ec48a4ed37"}]	2026-09-15 02:06:50.678895+00	2026-09-17 09:53:26.769+00
01a0a2d1-2564-75a3-8c0d-7a52ea2c82ed	01a0a2d1-2359-71bd-bf1c-d44dc1857384	3	ordering-at-a-cafe	Ordering at a Café	listening	12	[{"text": "Understand a short café conversation and order your own drink confidently.", "type": "objective"}, {"type": "explanation", "markdown": "Listen to a real café order from start to finish. Notice how the customer politely asks for what they want with *\\"Can I have...\\"* and *\\"Could I also get...\\"*."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-6c7080ddabc4", "01a0a2d1-1d9d-7087-8671-6493260e0a1e", "01a0a2d1-1d9d-7087-8671-5e6df3573bd9"]}, {"type": "examples", "items": [{"en": "Could I get a medium latte, please?", "vi": "Cho tôi một ly latte cỡ vừa được không?"}, {"en": "The menu offers a variety of beverages.", "vi": "Thực đơn có nhiều loại đồ uống."}]}, {"type": "audio", "listeningLessonId": "01a0a2d1-23bf-7614-8a65-959d740ca322"}, {"type": "exercise", "quizId": "01a0a2d1-1dfa-7577-8521-f7ec48a4ed37"}]	2026-09-15 02:06:50.726267+00	2026-09-17 09:53:26.85+00
01a0a2d1-257d-7275-8794-d029a3c0768d	01a0a2d1-2359-71bd-bf1c-d44dc1857384	4	daily-chores-and-habits	Daily Chores and Habits	vocabulary	10	[{"text": "Talk about chores, habits, and how tired they make you feel.", "type": "objective"}, {"type": "explanation", "markdown": "A *chore* is a small task like washing dishes; an *errand* is a task that takes you outside the house, like going to the bank. Notice the difference as you go through today's words."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9c-71ba-a344-3bbbff64de28", "01a0a2d1-1d9c-71ba-a344-375b2b2b42f8", "01a0a2d1-1d9c-71ba-a344-3f9eb9f9bfe7", "01a0a2d1-1d9c-71ba-a344-4103b3ec0d2c", "01a0a2d1-1d9c-71ba-a344-450ba78bdf43", "01a0a2d1-1d9c-71ba-a344-4aa86d714378"]}, {"type": "examples", "items": [{"en": "Washing dishes is my least favorite chore.", "vi": "Rửa bát là việc nhà tôi ghét nhất."}, {"en": "I need to run a few errands this afternoon.", "vi": "Chiều nay tôi cần đi làm vài việc vặt."}]}, {"type": "exercise", "quizId": "01a0a2d1-1dfa-7577-8521-f7ec48a4ed37"}]	2026-09-15 02:06:50.749857+00	2026-09-17 09:53:26.898+00
01a0a2d1-25a1-7509-90a0-24712c82afa5	01a0a2d1-235f-7781-bc24-29ad9c00396f	0	sharing-your-opinion	Sharing Your Opinion	vocabulary	10	[{"text": "Politely agree, disagree, and suggest ideas in a conversation.", "type": "objective"}, {"type": "explanation", "markdown": "Native speakers rarely say a flat \\"no\\" — they soften disagreement with phrases like *\\"I'm afraid I disagree\\"* or by *suggesting* an alternative instead. Practice both styles today."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-7585a34191e5", "01a0a2d1-1d9d-7087-8671-793a6a900848", "01a0a2d1-1d9d-7087-8671-7c625ce12029", "01a0a2d1-1d9d-7087-8671-81ab42dc4a94", "01a0a2d1-1d9d-7087-8671-8495925c117a"]}, {"type": "examples", "items": [{"en": "In my opinion, this book is excellent.", "vi": "Theo ý tôi, cuốn sách này rất hay."}, {"en": "I suggest we leave early tomorrow.", "vi": "Tôi đề nghị chúng ta khởi hành sớm vào ngày mai."}]}, {"type": "exercise", "quizId": "01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a"}]	2026-09-15 02:06:50.786074+00	2026-09-17 09:53:26.984+00
01a0a2d1-263b-709f-84c9-cf34d7735fc4	01a0a2d1-2365-7375-b42b-311e7131a885	0	at-the-airport	At the Airport	listening	12	[{"text": "Understand a real airport check-in conversation.", "type": "objective"}, {"type": "explanation", "markdown": "Airport English follows a predictable script: passport and ticket, luggage, seat choice, then a boarding pass. Listen for each of these four steps."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-b52b0a54f07d", "01a0a2d1-1d9d-7087-8671-b99e961fb659", "01a0a2d1-1d9d-7087-8671-bec0d36ac7e6", "01a0a2d1-1d9d-7087-8671-c0ef25d2695e", "01a0a2d1-1d9d-7087-8671-c7a23fcba4c7"]}, {"type": "examples", "items": [{"en": "Please keep your luggage with you at all times.", "vi": "Vui lòng giữ hành lý bên mình mọi lúc."}, {"en": "The departure time is 9 a.m.", "vi": "Giờ khởi hành là 9 giờ sáng."}]}, {"type": "audio", "listeningLessonId": "01a0a2d1-2450-72f8-bcb5-c8474776b0a1"}, {"type": "exercise", "quizId": "01a0a2d1-1eb9-7373-a4b2-1a45bf883e05"}]	2026-09-15 02:06:50.940577+00	2026-09-17 09:53:27.303+00
01a0a2d1-269e-7406-8c32-2af7465b4cc9	01a0a2d1-2365-7375-b42b-311e7131a885	3	getting-around-town	Getting Around Town	vocabulary	10	[{"text": "Talk about buses, trains, and fares when getting around a new city.", "type": "objective"}, {"type": "explanation", "markdown": "Know your \\"platform\\" from your \\"fare\\": the platform is where you wait for the train, the fare is the price of the ticket."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-69452b4f7c12", "01a0a2d1-1d9e-7539-bba7-6d0ba63effe2", "01a0a2d1-1d9e-7539-bba7-80b96ebff2dc", "01a0a2d1-1d9e-7539-bba7-7e9e6550ca5f", "01a0a2d1-1d9e-7539-bba7-76fc13f46af7"]}, {"type": "examples", "items": [{"en": "The train leaves from platform 4.", "vi": "Tàu khởi hành từ sân ga số 4."}, {"en": "A roundtrip ticket is cheaper than two one-way tickets.", "vi": "Vé khứ hồi rẻ hơn hai vé một chiều."}]}, {"type": "exercise", "quizId": "01a0a2d1-1eb9-7373-a4b2-1a45bf883e05"}]	2026-09-15 02:06:51.039942+00	2026-09-17 09:53:27.454+00
01a0a2d1-26f0-765d-ad3e-49741afebbb7	01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	2	talking-about-the-past	Talking About the Past: Past Simple	grammar	15	[{"text": "Use the Past Simple for completed actions at a specific past time.", "type": "objective"}, {"type": "explanation", "markdown": "See the full **Past Simple** grammar topic, including the most common irregular verbs."}, {"type": "examples", "items": [{"en": "She visited Paris last summer.", "vi": "Mùa hè năm ngoái cô ấy đã đến Paris."}, {"en": "Did you finish your homework?", "vi": "Bạn đã làm xong bài tập chưa?"}]}, {"type": "exercise", "quizId": "01a0a2d1-2041-7599-9d22-ce690ceb7d4f"}]	2026-09-15 02:06:51.121199+00	2026-09-17 09:53:27.614+00
01a0a2d1-26fb-7358-b734-0ff916269f96	01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	4	modal-verbs-for-advice	Modal Verbs for Advice and Obligation	grammar	15	[{"text": "Use should, must and can to give advice, state obligations, and ask permission.", "type": "objective"}, {"type": "explanation", "markdown": "See the full **Modal Verbs** grammar topic. Note that modal verbs are always followed by the base verb, with no \\"to\\"."}, {"type": "examples", "items": [{"en": "You should drink more water.", "vi": "Bạn nên uống nhiều nước hơn."}, {"en": "We must finish this by Friday.", "vi": "Chúng ta phải hoàn thành việc này trước thứ Sáu."}]}, {"type": "exercise", "quizId": "01a0a2d1-2158-74bc-b481-956f783c8f98"}]	2026-09-15 02:06:51.132294+00	2026-09-17 09:53:27.637+00
01a0a2d1-2713-7697-9104-d48dfb6268e2	01a0a2d1-236e-72c2-a4d1-224a81b7122d	1	building-an-argument	Building an Argument	vocabulary	12	[{"text": "Structure a persuasive academic argument with formal connectors.", "type": "objective"}, {"type": "explanation", "markdown": "Academic writing avoids casual connectors like \\"also\\" or \\"but\\", preferring *furthermore* and *however*. Formal writing also emphasizes points explicitly rather than relying on tone of voice."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-d37cea0751ee", "01a0a2d1-1d9e-7539-bba7-d40d52d869fa", "01a0a2d1-1d9e-7539-bba7-dabd67373697", "01a0a2d1-1d9f-76cd-bdf6-3aa402909293", "01a0a2d1-1d9f-76cd-bdf6-34f7ee7d3ec9"]}, {"type": "examples", "items": [{"en": "There was a significant improvement in her grades.", "vi": "Có sự cải thiện đáng kể trong điểm số của cô ấy."}, {"en": "The teacher emphasized the importance of practice.", "vi": "Giáo viên nhấn mạnh tầm quan trọng của việc luyện tập."}]}, {"type": "exercise", "quizId": "01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9"}]	2026-09-15 02:06:51.156409+00	2026-09-17 09:53:27.699+00
01a0a2d1-26dc-71d3-9cb2-26fef850b23b	01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	0	talking-about-habits	Talking About Habits: Present Simple	grammar	15	[{"text": "Use the Present Simple to describe habits, routines and facts.", "type": "objective"}, {"type": "explanation", "markdown": "See the full **Present Simple** grammar topic for rules and common mistakes. Here, focus on habits you do *regularly*."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-c3cd324ed76b", "01a0a2d1-1d9c-71ba-a344-375b2b2b42f8"]}, {"type": "examples", "items": [{"en": "I study English every day.", "vi": "Tôi học tiếng Anh mỗi ngày."}, {"en": "He exercises regularly every morning.", "vi": "Anh ấy tập thể dục đều đặn mỗi sáng."}]}, {"type": "exercise", "quizId": "01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa"}]	2026-09-15 02:06:51.101017+00	2026-09-17 09:53:27.576+00
01a0a2d1-26eb-7315-a6c8-95b22a3795ab	01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	1	whats-happening-now	What's Happening Now: Present Continuous	grammar	15	[{"text": "Use the Present Continuous for actions happening right now.", "type": "objective"}, {"type": "explanation", "markdown": "See the full **Present Continuous** grammar topic. Remember: some verbs like *know* and *want* aren't normally used in this form."}, {"type": "examples", "items": [{"en": "I am reading a book right now.", "vi": "Tôi đang đọc một cuốn sách."}, {"en": "They are watching a movie tonight.", "vi": "Tối nay họ đang xem phim."}]}, {"type": "exercise", "quizId": "01a0a2d1-1fd8-7047-afb9-07f25f2cc588"}]	2026-09-15 02:06:51.11588+00	2026-09-17 09:53:27.609+00
01a0a2d1-26f5-7379-b5cb-f11a47f6d644	01a0a2d1-236a-718a-b2b7-3bdbf0346b2a	3	making-comparisons	Making Comparisons: Comparatives	grammar	12	[{"text": "Compare people and things using comparative and superlative forms.", "type": "objective"}, {"type": "explanation", "markdown": "See the full **Comparatives** grammar topic. Watch out for irregular forms like *good → better → best*."}, {"type": "examples", "items": [{"en": "This phone is more expensive than mine.", "vi": "Chiếc điện thoại này đắt hơn của tôi."}, {"en": "She is the tallest student in the class.", "vi": "Cô ấy là học sinh cao nhất lớp."}]}, {"type": "exercise", "quizId": "01a0a2d1-2296-7253-bd0e-6d3f2380827b"}]	2026-09-15 02:06:51.126686+00	2026-09-17 09:53:27.625+00
01a0a2d1-2701-769a-9ccf-c0ad47474990	01a0a2d1-236e-72c2-a4d1-224a81b7122d	0	understanding-lectures	Understanding Lectures	listening	15	[{"text": "Follow the structure of a university lecture introduction.", "type": "objective"}, {"type": "explanation", "markdown": "Lecturers often open with the topic, a guiding question, and what to expect next (assignments, quizzes). Listen for all three parts."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-c43e5c5e93f3", "01a0a2d1-1d9e-7539-bba7-cd915316296d", "01a0a2d1-1d9f-76cd-bdf6-331eab7b929c"]}, {"type": "examples", "items": [{"en": "Researchers analyzed the survey results.", "vi": "Các nhà nghiên cứu đã phân tích kết quả khảo sát."}, {"en": "There is strong evidence to support this theory.", "vi": "Có bằng chứng mạnh mẽ để ủng hộ giả thuyết này."}]}, {"type": "audio", "listeningLessonId": "01a0a2d1-24d0-7455-98d4-fcddeb44e524"}, {"type": "exercise", "quizId": "01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9"}]	2026-09-15 02:06:51.137925+00	2026-09-17 09:53:27.65+00
01a0a2d1-2617-709a-abe2-7a2ba206dd0e	01a0a2d1-235f-7781-bc24-29ad9c00396f	4	keeping-a-conversation-going	Keeping a Conversation Going	vocabulary	10	[{"text": "Use follow-up questions and comments to keep a conversation alive.", "type": "objective"}, {"type": "explanation", "markdown": "Being *curious* about the other person is the easiest way to keep talking — ask a follow-up question instead of only sharing your own opinion."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-8b9a20839eba", "01a0a2d1-1d9d-7087-8671-81ab42dc4a94", "01a0a2d1-1d9d-7087-8671-adc93abe3498", "01a0a2d1-1d9d-7087-8671-a99657868a25"]}, {"type": "examples", "items": [{"en": "She was curious about his new job.", "vi": "Cô ấy tò mò về công việc mới của anh ấy."}, {"en": "Sorry to interrupt, but that reminds me of something.", "vi": "Xin lỗi vì đã ngắt lời, nhưng điều đó làm tôi nhớ tới một chuyện."}]}, {"type": "exercise", "quizId": "01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a"}]	2026-09-15 02:06:50.90439+00	2026-09-17 09:53:27.234+00
01a0a2d1-268b-754c-b7bb-c7d2c2dfc675	01a0a2d1-2365-7375-b42b-311e7131a885	2	asking-for-directions	Asking for Directions	listening	10	[{"text": "Ask for and understand simple street directions.", "type": "objective"}, {"type": "explanation", "markdown": "Directions almost always use the same building blocks: a direction (*straight*, *left*, *right*), a distance (*two blocks*), and a landmark (*at the pharmacy*)."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-76fc13f46af7", "01a0a2d1-1d9e-7539-bba7-7e9e6550ca5f"]}, {"type": "examples", "items": [{"en": "Go straight for two blocks, then turn left.", "vi": "Đi thẳng hai dãy nhà, sau đó rẽ trái."}, {"en": "We took a detour to avoid traffic.", "vi": "Chúng tôi đã đi đường vòng để tránh kẹt xe."}]}, {"type": "audio", "listeningLessonId": "01a0a2d1-2492-7157-9111-8d77e34aca70"}, {"type": "exercise", "quizId": "01a0a2d1-1eb9-7373-a4b2-1a45bf883e05"}]	2026-09-15 02:06:51.021036+00	2026-09-17 09:53:27.425+00
01a0a2d1-2751-7556-bea1-d79bbe505439	01a0a2d1-236e-72c2-a4d1-224a81b7122d	3	formal-writing-connectors	Formal Writing Connectors	vocabulary	10	[{"text": "Link ideas smoothly in formal writing using connectors.", "type": "objective"}, {"type": "explanation", "markdown": "Connectors like *therefore* and *despite* signal how one idea relates to the next — result, contrast, or condition — which makes essays easier to follow."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-dabd67373697", "01a0a2d1-1d9e-7539-bba7-93043459bf9b", "01a0a2d1-1d9e-7539-bba7-97f3a0e1cb58", "01a0a2d1-1d9e-7539-bba7-9c9c46a6b896", "01a0a2d1-1d9e-7539-bba7-8ef79cd7ffd4"]}, {"type": "examples", "items": [{"en": "The plan sounded good; however, it was too expensive.", "vi": "Kế hoạch nghe có vẻ tốt; tuy nhiên, nó quá đắt."}, {"en": "Despite the rain, the match continued.", "vi": "Mặc dù trời mưa, trận đấu vẫn tiếp tục."}]}, {"type": "exercise", "quizId": "01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9"}]	2026-09-15 02:06:51.218656+00	2026-09-17 09:53:27.82+00
01a0a2d1-24dd-768d-8495-01f727ae6d43	01a0a2d1-2359-71bd-bf1c-d44dc1857384	0	your-morning-routine	Your Morning Routine	vocabulary	10	[{"text": "Describe what you do every morning using simple present-tense verbs.", "type": "objective"}, {"type": "explanation", "markdown": "Most daily routines are described with the **Present Simple** (see the Present Simple grammar topic) plus a small set of routine verbs. Learn the five verbs below, then practice building full sentences like *\\"I wake up at 6, then I get up and take a shower.\\"*"}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9a-731b-994c-dbddbdfba368", "01a0a2d1-1d9b-7549-8636-74300652b918", "01a0a2d1-1d9c-71ba-a344-267ede250d4c", "01a0a2d1-1d9c-71ba-a344-2bf0ae9a3def", "01a0a2d1-1d9c-71ba-a344-2c560c431205"]}, {"type": "examples", "items": [{"en": "I wake up at six every morning.", "vi": "Tôi thức dậy lúc sáu giờ mỗi sáng."}, {"en": "She brushes her teeth after breakfast.", "vi": "Cô ấy đánh răng sau bữa sáng."}]}, {"type": "exercise", "quizId": "01a0a2d1-1dfa-7577-8521-f7ec48a4ed37"}]	2026-09-15 02:06:50.589835+00	2026-09-17 09:53:26.618+00
01a0a2d1-2773-77a2-95dd-d4f840f4330a	01a0a2d1-236e-72c2-a4d1-224a81b7122d	4	discussing-controversial-topics	Discussing Controversial Topics	vocabulary	12	[{"text": "Discuss debated topics objectively, using precise academic vocabulary.", "type": "objective"}, {"type": "explanation", "markdown": "Being *objective* means presenting all sides of a *controversial* topic fairly, rather than only your own *opinion*."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9f-76cd-bdf6-3fbdadffbeaa", "01a0a2d1-1d9e-7539-bba7-e65781292348", "01a0a2d1-1d9d-7087-8671-7585a34191e5", "01a0a2d1-1d9e-7539-bba7-d37cea0751ee"]}, {"type": "examples", "items": [{"en": "It was a controversial decision.", "vi": "Đó là một quyết định gây tranh cãi."}, {"en": "The main objective of the study is to reduce costs.", "vi": "Mục tiêu chính của nghiên cứu là giảm chi phí."}]}, {"type": "exercise", "quizId": "01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9"}]	2026-09-15 02:06:51.251797+00	2026-09-17 09:53:27.878+00
01a0a2d1-25e7-737c-baa8-14d210221177	01a0a2d1-235f-7781-bc24-29ad9c00396f	2	apologizing-and-complimenting	Apologizing and Complimenting	vocabulary	10	[{"text": "Apologize sincerely and give genuine compliments.", "type": "objective"}, {"type": "explanation", "markdown": "A good apology names the mistake directly: *\\"I want to apologize for being late\\"* — not just \\"sorry\\". Compliments work best when they're specific, too."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-a1f11a2fe18c", "01a0a2d1-1d9d-7087-8671-a51f11d4364b", "01a0a2d1-1d9d-7087-8671-a99657868a25", "01a0a2d1-1d9d-7087-8671-adc93abe3498"]}, {"type": "examples", "items": [{"en": "I want to apologize for being late.", "vi": "Tôi muốn xin lỗi vì đã đến trễ."}, {"en": "Thank you for the compliment.", "vi": "Cảm ơn vì lời khen."}]}, {"type": "exercise", "quizId": "01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a"}]	2026-09-15 02:06:50.856057+00	2026-09-17 09:53:27.136+00
01a0a2d1-2663-711e-911f-d10c6285bb9e	01a0a2d1-2365-7375-b42b-311e7131a885	1	booking-accommodation	Booking Accommodation	vocabulary	10	[{"text": "Book a hotel room and understand common hotel vocabulary.", "type": "objective"}, {"type": "explanation", "markdown": "\\"Vacancy\\" and \\"reservation\\" are two of the most useful words at a hotel front desk — one means a room is free, the other means you've already secured one."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-c86c6b925f7c", "01a0a2d1-1d9e-7539-bba7-5fc140dddebc", "01a0a2d1-1d9e-7539-bba7-60c9ab002603", "01a0a2d1-1d9d-7087-8671-6912503ba560", "01a0a2d1-1d9e-7539-bba7-664430bb8d9d"]}, {"type": "examples", "items": [{"en": "We booked our accommodation online.", "vi": "Chúng tôi đã đặt chỗ ở qua mạng."}, {"en": "Checkout time is noon.", "vi": "Giờ trả phòng là 12 giờ trưa."}]}, {"type": "exercise", "quizId": "01a0a2d1-1eb9-7373-a4b2-1a45bf883e05"}]	2026-09-15 02:06:50.980576+00	2026-09-17 09:53:27.365+00
01a0a2d1-26bc-72b6-a468-f2a8aba08980	01a0a2d1-2365-7375-b42b-311e7131a885	4	souvenirs-and-shopping	Souvenirs and Shopping	vocabulary	10	[{"text": "Shop for souvenirs and handle receipts and refunds.", "type": "objective"}, {"type": "explanation", "markdown": "Always ask for a *receipt* when you shop — you'll need it if you want a *refund* later."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-71e141f2ed72", "01a0a2d1-1d9e-7539-bba7-664430bb8d9d", "01a0a2d1-1d9f-76cd-bdf6-83f794e954f3", "01a0a2d1-1d9f-76cd-bdf6-862c32b1b1e6", "01a0a2d1-1d9f-76cd-bdf6-8a5a7e5269d6"]}, {"type": "examples", "items": [{"en": "I bought a souvenir for my sister.", "vi": "Tôi đã mua một món quà lưu niệm cho chị tôi."}, {"en": "Keep your receipt in case you need to return it.", "vi": "Giữ hóa đơn phòng khi bạn cần trả hàng."}]}, {"type": "exercise", "quizId": "01a0a2d1-1eb9-7373-a4b2-1a45bf883e05"}]	2026-09-15 02:06:51.068839+00	2026-09-17 09:53:27.516+00
01a0a2d1-2607-73d5-9afb-905400d7e3cc	01a0a2d1-235f-7781-bc24-29ad9c00396f	3	small-talk-at-work	Small Talk at Work	listening	12	[{"text": "Follow a casual workplace conversation about weekends and plans.", "type": "objective"}, {"type": "explanation", "markdown": "Small talk usually follows a pattern: a friendly question, a short answer, then a question back. Listen for how Anna and Tom take turns asking about each other's weekend."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9d-7087-8671-adc93abe3498", "01a0a2d1-1d9d-7087-8671-7585a34191e5"]}, {"type": "examples", "items": [{"en": "How was your weekend?", "vi": "Cuối tuần của bạn thế nào?"}, {"en": "Tell me about it.", "vi": "Đúng vậy đó (dùng để đồng cảm)."}]}, {"type": "audio", "listeningLessonId": "01a0a2d1-2401-72d1-b69f-a6f7a8ec9008"}, {"type": "exercise", "quizId": "01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a"}]	2026-09-15 02:06:50.887799+00	2026-09-17 09:53:27.198+00
01a0a2d1-2733-72b3-a35e-c4458f96d805	01a0a2d1-236e-72c2-a4d1-224a81b7122d	2	research-vocabulary	Research Vocabulary	vocabulary	12	[{"text": "Use core research terms: hypothesis, methodology, and criteria.", "type": "objective"}, {"type": "explanation", "markdown": "Every research paper follows roughly the same shape: a *hypothesis*, a *methodology* to test it, and *criteria* to judge the results."}, {"type": "vocabulary", "vocabularyIds": ["01a0a2d1-1d9e-7539-bba7-c8c5f78d2fdf", "01a0a2d1-1d9e-7539-bba7-e028af34422e", "01a0a2d1-1d9f-76cd-bdf6-405d8a5840e1", "01a0a2d1-1d9e-7539-bba7-dfa957b2f221", "01a0a2d1-1d9f-76cd-bdf6-467da12b4976"]}, {"type": "examples", "items": [{"en": "The scientist tested her hypothesis in the lab.", "vi": "Nhà khoa học đã kiểm chứng giả thuyết của mình trong phòng thí nghiệm."}, {"en": "The report concludes that more funding is needed.", "vi": "Báo cáo kết luận rằng cần thêm kinh phí."}]}, {"type": "exercise", "quizId": "01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9"}]	2026-09-15 02:06:51.187885+00	2026-09-17 09:53:27.76+00
\.


--
-- Data for Name: listening_lessons; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.listening_lessons (id, slug, title, difficulty, duration_seconds, audio_url, transcript, quiz_id, course_id, created_at, updated_at) FROM stdin;
01a0a2d1-23bf-7614-8a65-959d740ca322	ordering-coffee	Ordering Coffee	easy	32	/audio/listening/ordering-coffee.mp3	Barista: Hi, welcome to Sunrise Café. What can I get you?\nCustomer: Hi, can I have a medium latte, please?\nBarista: Sure. Would you like that hot or iced?\nCustomer: Iced, please. And could I also get a blueberry muffin?\nBarista: Of course. That's one iced latte and one blueberry muffin. For here or to go?\nCustomer: To go, thanks.\nBarista: That'll be six dollars fifty. Can I have your name for the order?\nCustomer: It's Minh.\nBarista: Great, Minh. It'll be ready in a few minutes.	01a0a2d1-2378-71a1-8ff3-8f9c0bd6864b	01a0a2d1-2359-71bd-bf1c-d44dc1857384	2026-09-15 02:06:50.303794+00	2026-09-17 09:53:26.091+00
01a0a2d1-2401-72d1-b69f-a6f7a8ec9008	small-talk-at-work	Making Small Talk at Work	medium	31	/audio/listening/small-talk-at-work.mp3	Anna: Morning, Tom! How was your weekend?\nTom: Pretty good, thanks. I went hiking with a few friends. How about you?\nAnna: Nothing too exciting — I mostly stayed home and caught up on some reading.\nTom: That sounds relaxing, honestly. This week has been so busy already.\nAnna: Tell me about it. I've got three meetings before lunch.\nTom: Same here. Anyway, are you still coming to the team lunch on Friday?\nAnna: Definitely, I wouldn't miss it. See you there!	01a0a2d1-23c6-7106-90da-c509e9a0e12b	01a0a2d1-235f-7781-bc24-29ad9c00396f	2026-09-15 02:06:50.370709+00	2026-09-17 09:53:26.237+00
01a0a2d1-2450-72f8-bcb5-c8474776b0a1	airport-check-in	Checking in at the Airport	medium	35	/audio/listening/airport-check-in.mp3	Agent: Good morning. Passport and ticket, please.\nPassenger: Here you go. I'm flying to Singapore.\nAgent: Thank you. Do you have any luggage to check in?\nPassenger: Yes, just one suitcase.\nAgent: Okay, please place it on the scale... That's twenty-two kilograms, just under the limit. Would you like a window or aisle seat?\nPassenger: Window, please, if it's available.\nAgent: You're all set. Here's your boarding pass — boarding starts at gate 14 at 10:30, and the flight departs at 11:15.\nPassenger: Thank you very much.	01a0a2d1-2407-76cc-9395-cf8fc0d5d256	01a0a2d1-2365-7375-b42b-311e7131a885	2026-09-15 02:06:50.449916+00	2026-09-17 09:53:26.351+00
01a0a2d1-2492-7157-9111-8d77e34aca70	asking-for-directions	Asking for Directions	easy	27	/audio/listening/asking-for-directions.mp3	Tourist: Excuse me, could you tell me how to get to the train station?\nLocal: Sure. Go straight for two blocks, then turn left at the pharmacy.\nTourist: Straight for two blocks, then left at the pharmacy.\nLocal: That's right. The station will be on your right, just past the small park.\nTourist: How long does it take on foot?\nLocal: About ten minutes.\nTourist: Great, thank you so much!\nLocal: You're welcome. Have a safe trip!	01a0a2d1-2456-76d7-8b4d-10c0c3cbe9a6	01a0a2d1-2365-7375-b42b-311e7131a885	2026-09-15 02:06:50.515435+00	2026-09-17 09:53:26.463+00
01a0a2d1-24d0-7455-98d4-fcddeb44e524	university-lecture-intro	A University Lecture Introduction	hard	40	/audio/listening/university-lecture-intro.mp3	Professor: Good morning, everyone. Today we're going to start looking at climate change and its economic impact. Before we dive into the data, I want you to consider a simple question: who actually pays the cost when a natural resource is damaged? Over the next few weeks, we'll analyze several case studies, starting with coastal cities affected by rising sea levels. I'll also give you a short reading assignment for next class — please review the article posted on the course page. There will be a short quiz at the end of this unit, so take good notes. Any questions before we begin?	01a0a2d1-2498-7725-9ee8-facbe977b44a	01a0a2d1-236e-72c2-a4d1-224a81b7122d	2026-09-15 02:06:50.577182+00	2026-09-17 09:53:26.592+00
\.


--
-- Data for Name: placement_test_attempts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.placement_test_attempts (id, user_id, placement_test_id, score, estimated_level, answers, started_at, completed_at, created_at, updated_at) FROM stdin;
01a0a3ba-bceb-75e1-b055-66c7e9e871aa	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	65	B2	[{"prompt": "She ______ a teacher.", "isCorrect": true, "questionId": "01a0a2d1-2793-75e0-9d6a-393de789ce55", "userAnswerLabel": "is", "correctAnswerLabel": "is", "selectedOptionIndex": 0}, {"prompt": "\\"I have two brother\\" is a correctly written sentence.", "isCorrect": false, "questionId": "01a0a2d1-279b-745e-999a-5dc78dcef843", "userAnswerLabel": "True", "correctAnswerLabel": "False", "selectedOptionIndex": 0}, {"prompt": "What is the plural of \\"child\\"?", "isCorrect": true, "questionId": "01a0a2d1-27a1-731b-910c-5b7dfdcad16c", "userAnswerLabel": "children", "correctAnswerLabel": "children", "selectedOptionIndex": 1}, {"prompt": "He ______ (like) pizza.", "isCorrect": true, "questionId": "01a0a2d1-27a6-70da-9591-a411031bc20e", "textAnswer": "likes", "userAnswerLabel": "likes", "correctAnswerLabel": "likes"}, {"prompt": "Yesterday, I ______ to the market.", "isCorrect": true, "questionId": "01a0a2d1-27ae-7379-b8bf-5bc1f6875668", "userAnswerLabel": "went", "correctAnswerLabel": "went", "selectedOptionIndex": 0}, {"prompt": "\\"She is going to the party tomorrow\\" describes something that already happened.", "isCorrect": false, "questionId": "01a0a2d1-27b3-731e-adfe-b04c23aaa837", "userAnswerLabel": "True", "correctAnswerLabel": "False", "selectedOptionIndex": 0}, {"prompt": "This bag is ______ than that one. (cheap)", "isCorrect": true, "questionId": "01a0a2d1-27b8-710c-8f7d-9f296fd8262d", "userAnswerLabel": "cheaper", "correctAnswerLabel": "cheaper", "selectedOptionIndex": 0}, {"prompt": "There ______ (not/be) enough time to finish.", "isCorrect": false, "questionId": "01a0a2d1-27bd-7558-9221-4d38c6c7b299", "textAnswer": "are not", "userAnswerLabel": "are not", "correctAnswerLabel": "isn't / wasn't"}, {"prompt": "I ______ never ______ sushi before.", "isCorrect": true, "questionId": "01a0a2d1-27c2-7431-aa36-5ea03a729d30", "userAnswerLabel": "have / eaten", "correctAnswerLabel": "have / eaten", "selectedOptionIndex": 0}, {"prompt": "\\"If it rains, I will stay home\\" is a first conditional sentence.", "isCorrect": true, "questionId": "01a0a2d1-27c7-70f6-b3ee-9656840dfb06", "userAnswerLabel": "True", "correctAnswerLabel": "True", "selectedOptionIndex": 0}, {"prompt": "You ______ arrive on time; it's very important.", "isCorrect": true, "questionId": "01a0a2d1-27cc-7241-acd7-c8759b0c2d1f", "userAnswerLabel": "must", "correctAnswerLabel": "must", "selectedOptionIndex": 0}, {"prompt": "She has lived here ______ five years.", "isCorrect": false, "questionId": "01a0a2d1-27d2-70e7-8f1f-405a9832b76e", "textAnswer": "dá", "userAnswerLabel": "dá", "correctAnswerLabel": "for"}, {"prompt": "The novel ______ by Jane Austen.", "isCorrect": true, "questionId": "01a0a2d1-27d6-745c-8948-38d68a86c05e", "userAnswerLabel": "was written", "correctAnswerLabel": "was written", "selectedOptionIndex": 0}, {"prompt": "\\"Despite\\" and \\"although\\" can both be used to introduce a contrast.", "isCorrect": true, "questionId": "01a0a2d1-27db-7349-a238-94cdbed434dd", "userAnswerLabel": "True", "correctAnswerLabel": "True", "selectedOptionIndex": 0}, {"prompt": "If I ______ more time, I would travel more.", "isCorrect": true, "questionId": "01a0a2d1-27e0-706f-b1a4-ab27fd6279d4", "userAnswerLabel": "had", "correctAnswerLabel": "had", "selectedOptionIndex": 0}, {"prompt": "The results ______ (analyze) carefully before publishing.", "isCorrect": false, "questionId": "01a0a2d1-27e5-77e0-b9f9-11fa83b4d2b2", "textAnswer": "is", "userAnswerLabel": "is", "correctAnswerLabel": "were analyzed"}, {"prompt": "Choose the closest meaning to \\"nevertheless\\" in: \\"The evidence was weak; nevertheless, the jury convicted him.\\"", "isCorrect": true, "questionId": "01a0a2d1-27ed-7662-8f81-bbb240a7a7d3", "userAnswerLabel": "however", "correctAnswerLabel": "however", "selectedOptionIndex": 0}, {"prompt": "The word \\"meticulous\\" means careless and disorganized.", "isCorrect": false, "questionId": "01a0a2d1-27f3-70fb-8425-db5d33b62cce", "userAnswerLabel": "True", "correctAnswerLabel": "False", "selectedOptionIndex": 0}, {"prompt": "Not only ______ she a great singer, but she also writes her own songs.", "isCorrect": true, "questionId": "01a0a2d1-27f8-755c-889e-1a0487d720e7", "userAnswerLabel": "is", "correctAnswerLabel": "is", "selectedOptionIndex": 0}, {"prompt": "The committee's decision was met with widespread ______ (criticize) from the public.", "isCorrect": false, "questionId": "01a0a2d1-27fd-775f-b070-df4738046017", "textAnswer": "are", "userAnswerLabel": "are", "correctAnswerLabel": "criticism"}]	2026-09-15 06:20:41.313+00	2026-09-15 06:21:59.403+00	2026-09-15 06:21:59.406931+00	2026-09-15 06:21:59.406931+00
\.


--
-- Data for Name: placement_test_questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.placement_test_questions (id, placement_test_id, order_index, level, type, prompt, options, explanation, points, created_at, updated_at) FROM stdin;
01a0a2d1-27d2-70e7-8f1f-405a9832b76e	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	11	B1	fill_blank	She has lived here ______ five years.	[{"content": "for", "isCorrect": true}]	Use "for" with a period of time (five years); use "since" with a starting point (2019).	1	2026-09-15 02:06:51.346591+00	2026-09-17 09:53:28.054+00
01a0a2d1-27d6-745c-8948-38d68a86c05e	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	12	B2	multiple_choice	The novel ______ by Jane Austen.	[{"content": "was written", "isCorrect": true}, {"content": "wrote", "isCorrect": false}, {"content": "is writing", "isCorrect": false}, {"content": "has write", "isCorrect": false}]	Passive voice, past simple: was/were + past participle → "was written".	1	2026-09-15 02:06:51.35142+00	2026-09-17 09:53:28.065+00
01a0a2d1-27db-7349-a238-94cdbed434dd	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	13	B2	true_false	"Despite" and "although" can both be used to introduce a contrast.	[{"content": "True", "isCorrect": true}, {"content": "False", "isCorrect": false}]	Both introduce contrast, but "despite" is followed by a noun/-ing form, while "although" is followed by a clause.	1	2026-09-15 02:06:51.35617+00	2026-09-17 09:53:28.086+00
01a0a2d1-27e0-706f-b1a4-ab27fd6279d4	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	14	B2	multiple_choice	If I ______ more time, I would travel more.	[{"content": "had", "isCorrect": true}, {"content": "have", "isCorrect": false}, {"content": "will have", "isCorrect": false}, {"content": "would have", "isCorrect": false}]	Second conditional: If + past simple, would + base verb.	1	2026-09-15 02:06:51.360992+00	2026-09-17 09:53:28.092+00
01a0a2d1-27e5-77e0-b9f9-11fa83b4d2b2	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	15	B2	fill_blank	The results ______ (analyze) carefully before publishing.	[{"content": "were analyzed", "isCorrect": true}]	Passive voice, past simple: "were analyzed".	1	2026-09-15 02:06:51.365923+00	2026-09-17 09:53:28.104+00
01a0a2d1-27ed-7662-8f81-bbb240a7a7d3	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	16	C1	multiple_choice	Choose the closest meaning to "nevertheless" in: "The evidence was weak; nevertheless, the jury convicted him."	[{"content": "however", "isCorrect": true}, {"content": "because", "isCorrect": false}, {"content": "therefore", "isCorrect": false}, {"content": "meanwhile", "isCorrect": false}]	"Nevertheless" signals contrast, like "however" — despite the weak evidence, the jury still convicted him.	1	2026-09-15 02:06:51.373894+00	2026-09-17 09:53:28.123+00
01a0a2d1-27f3-70fb-8425-db5d33b62cce	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	17	C1	true_false	The word "meticulous" means careless and disorganized.	[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}]	"Meticulous" means the opposite — extremely careful and precise about details.	1	2026-09-15 02:06:51.380412+00	2026-09-17 09:53:28.135+00
01a0a2d1-27f8-755c-889e-1a0487d720e7	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	18	C1	multiple_choice	Not only ______ she a great singer, but she also writes her own songs.	[{"content": "is", "isCorrect": true}, {"content": "she is", "isCorrect": false}, {"content": "does", "isCorrect": false}, {"content": "was", "isCorrect": false}]	"Not only" at the start of a clause triggers inversion: "Not only is she..."	1	2026-09-15 02:06:51.385341+00	2026-09-17 09:53:28.141+00
01a0a2d1-27fd-775f-b070-df4738046017	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	19	C1	fill_blank	The committee's decision was met with widespread ______ (criticize) from the public.	[{"content": "criticism", "isCorrect": true}]	The noun form of "criticize" is "criticism".	1	2026-09-15 02:06:51.389977+00	2026-09-17 09:53:28.159+00
01a0a2d1-2793-75e0-9d6a-393de789ce55	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	0	A1	multiple_choice	She ______ a teacher.	[{"content": "is", "isCorrect": true}, {"content": "am", "isCorrect": false}, {"content": "are", "isCorrect": false}, {"content": "be", "isCorrect": false}]	"She" takes the verb "is" with the verb "to be".	1	2026-09-15 02:06:51.284831+00	2026-09-17 09:53:27.94+00
01a0a2d1-279b-745e-999a-5dc78dcef843	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	1	A1	true_false	"I have two brother" is a correctly written sentence.	[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}]	The plural of "brother" is "brothers": "I have two brothers."	1	2026-09-15 02:06:51.292538+00	2026-09-17 09:53:27.952+00
01a0a2d1-27a1-731b-910c-5b7dfdcad16c	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	2	A1	multiple_choice	What is the plural of "child"?	[{"content": "childs", "isCorrect": false}, {"content": "children", "isCorrect": true}, {"content": "childes", "isCorrect": false}, {"content": "child's", "isCorrect": false}]	"Child" has an irregular plural: "children".	1	2026-09-15 02:06:51.298307+00	2026-09-17 09:53:27.957+00
01a0a2d1-27a6-70da-9591-a411031bc20e	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	3	A1	fill_blank	He ______ (like) pizza.	[{"content": "likes", "isCorrect": true}]	Present simple, third person singular: add -s → "likes".	1	2026-09-15 02:06:51.303034+00	2026-09-17 09:53:27.968+00
01a0a2d1-27ae-7379-b8bf-5bc1f6875668	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	4	A2	multiple_choice	Yesterday, I ______ to the market.	[{"content": "went", "isCorrect": true}, {"content": "goed", "isCorrect": false}, {"content": "go", "isCorrect": false}, {"content": "gone", "isCorrect": false}]	"Go" is irregular in the past simple: go → went.	1	2026-09-15 02:06:51.311446+00	2026-09-17 09:53:27.98+00
01a0a2d1-27b3-731e-adfe-b04c23aaa837	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	5	A2	true_false	"She is going to the party tomorrow" describes something that already happened.	[{"content": "True", "isCorrect": false}, {"content": "False", "isCorrect": true}]	"Tomorrow" is a future time — this describes a future plan, not the past.	1	2026-09-15 02:06:51.315871+00	2026-09-17 09:53:27.992+00
01a0a2d1-27b8-710c-8f7d-9f296fd8262d	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	6	A2	multiple_choice	This bag is ______ than that one. (cheap)	[{"content": "cheaper", "isCorrect": true}, {"content": "more cheap", "isCorrect": false}, {"content": "cheapest", "isCorrect": false}, {"content": "cheap", "isCorrect": false}]	Short adjectives like "cheap" take -er in the comparative form.	1	2026-09-15 02:06:51.320987+00	2026-09-17 09:53:28.004+00
01a0a2d1-27bd-7558-9221-4d38c6c7b299	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	7	A2	fill_blank	There ______ (not/be) enough time to finish.	[{"content": "isn't", "isCorrect": true}, {"content": "wasn't", "isCorrect": true}]	Negative form of "to be": "isn't" (present) or "wasn't" (past) are both acceptable here.	1	2026-09-15 02:06:51.326008+00	2026-09-17 09:53:28.013+00
01a0a2d1-27c2-7431-aa36-5ea03a729d30	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	8	B1	multiple_choice	I ______ never ______ sushi before.	[{"content": "have / eaten", "isCorrect": true}, {"content": "has / eaten", "isCorrect": false}, {"content": "had / eat", "isCorrect": false}, {"content": "did / eat", "isCorrect": false}]	"Never... before" signals the Present Perfect: "I have never eaten sushi before."	1	2026-09-15 02:06:51.330663+00	2026-09-17 09:53:28.025+00
01a0a2d1-27c7-70f6-b3ee-9656840dfb06	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	9	B1	true_false	"If it rains, I will stay home" is a first conditional sentence.	[{"content": "True", "isCorrect": true}, {"content": "False", "isCorrect": false}]	It describes a real future possibility: If + present simple, will + base verb.	1	2026-09-15 02:06:51.335854+00	2026-09-17 09:53:28.037+00
01a0a2d1-27cc-7241-acd7-c8759b0c2d1f	01a0a2d1-278d-75d2-be26-3c56a0bd4d19	10	B1	multiple_choice	You ______ arrive on time; it's very important.	[{"content": "must", "isCorrect": true}, {"content": "might", "isCorrect": false}, {"content": "could", "isCorrect": false}, {"content": "would", "isCorrect": false}]	"Must" expresses strong obligation, which fits "it's very important".	1	2026-09-15 02:06:51.340993+00	2026-09-17 09:53:28.043+00
\.


--
-- Data for Name: placement_tests; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.placement_tests (id, slug, title, description, created_at, updated_at) FROM stdin;
01a0a2d1-278d-75d2-be26-3c56a0bd4d19	general-placement-test	English Placement Test	20 questions spanning A1 to C1, used to estimate your CEFR level when you first sign up (spec §8).	2026-09-15 02:06:51.277896+00	2026-09-17 09:53:27.927+00
\.


--
-- Data for Name: quiz_answers; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz_answers (id, question_id, order_index, content, is_correct, created_at, updated_at) FROM stdin;
01a0a2d1-1e88-71e3-8552-c201783a8db7	01a0a2d1-1e83-702d-a1c1-c57be2892e40	0	True	f	2026-09-15 02:06:48.969637+00	2026-09-17 09:53:18.916+00
01a0a2d1-1e8e-751e-9ee2-4e27e8bb6a24	01a0a2d1-1e83-702d-a1c1-c57be2892e40	1	False	t	2026-09-15 02:06:48.976261+00	2026-09-17 09:53:18.921+00
01a0a2d1-1e9a-77c1-9a33-debc52c1e2bd	01a0a2d1-1e95-77bd-b6e1-397cabd3b53e	0	interrupt	t	2026-09-15 02:06:48.987076+00	2026-09-17 09:53:18.944+00
01a0a2d1-1ea4-734c-af85-97e3a6b7c7de	01a0a2d1-1e9f-72a7-a12e-ca50c466a13c	0	nervous	t	2026-09-15 02:06:48.997412+00	2026-09-17 09:53:18.965+00
01a0a2d1-1ea9-77eb-9253-ae8a8d77540d	01a0a2d1-1e9f-72a7-a12e-ca50c466a13c	1	confident	f	2026-09-15 02:06:49.002279+00	2026-09-17 09:53:18.977+00
01a0a2d1-1eae-7505-b0f1-d0372faad34a	01a0a2d1-1e9f-72a7-a12e-ca50c466a13c	2	curious	f	2026-09-15 02:06:49.006776+00	2026-09-17 09:53:18.989+00
01a0a2d1-1eb3-7275-bf15-ea8daf9b3bad	01a0a2d1-1e9f-72a7-a12e-ca50c466a13c	3	generous	f	2026-09-15 02:06:49.01215+00	2026-09-17 09:53:19.001+00
01a0a2d1-1ec4-74bf-b0ad-9f7da1b190e5	01a0a2d1-1ebf-72a8-a5da-52d7235a8f56	0	boarding pass	t	2026-09-15 02:06:49.029751+00	2026-09-17 09:53:19.031+00
01a0a2d1-1eca-76b4-9b16-dd06f84f8fbd	01a0a2d1-1ebf-72a8-a5da-52d7235a8f56	1	receipt	f	2026-09-15 02:06:49.034968+00	2026-09-17 09:53:19.05+00
01a0a2d1-1ecf-70ed-b4a0-69cd638cd277	01a0a2d1-1ebf-72a8-a5da-52d7235a8f56	2	itinerary	f	2026-09-15 02:06:49.04018+00	2026-09-17 09:53:19.066+00
01a0a2d1-1ed5-7623-81ee-6c7f8a36a959	01a0a2d1-1ebf-72a8-a5da-52d7235a8f56	3	currency	f	2026-09-15 02:06:49.045882+00	2026-09-17 09:53:19.078+00
01a0a2d1-1edf-7600-a7f2-7b4a218a0b5d	01a0a2d1-1eda-7403-af24-26b8c567d7d0	0	True	f	2026-09-15 02:06:49.056546+00	2026-09-17 09:53:19.103+00
01a0a2d1-1ee4-7353-b0d3-eec51dd38bc2	01a0a2d1-1eda-7403-af24-26b8c567d7d0	1	False	t	2026-09-15 02:06:49.061396+00	2026-09-17 09:53:19.115+00
01a0a2d1-1eee-7006-a9d5-8b5219ac895f	01a0a2d1-1ee9-7083-b5ba-cb1d40b92824	0	customs	t	2026-09-15 02:06:49.070959+00	2026-09-17 09:53:19.148+00
01a0a2d1-1ef9-77d8-98ce-4e1052862a25	01a0a2d1-1ef3-7041-b1eb-8622e9e4635e	0	roundtrip ticket	t	2026-09-15 02:06:49.082421+00	2026-09-17 09:53:19.166+00
01a0a2d1-1efe-7327-825e-0822240a1e7c	01a0a2d1-1ef3-7041-b1eb-8622e9e4635e	1	one-way ticket	f	2026-09-15 02:06:49.087864+00	2026-09-17 09:53:19.178+00
01a0a2d1-1f04-76c6-803c-40492778ac26	01a0a2d1-1ef3-7041-b1eb-8622e9e4635e	2	boarding pass	f	2026-09-15 02:06:49.093697+00	2026-09-17 09:53:19.19+00
01a0a2d1-1f0a-7281-800f-b23e3222b061	01a0a2d1-1ef3-7041-b1eb-8622e9e4635e	3	platform ticket	f	2026-09-15 02:06:49.099723+00	2026-09-17 09:53:19.202+00
01a0a2d1-1f1c-7244-bb77-51279548d363	01a0a2d1-1f16-70ac-ba15-09409253cb98	0	hypothesis	t	2026-09-15 02:06:49.117312+00	2026-09-17 09:53:19.238+00
01a0a2d1-1f21-73d5-90ab-bd91c6478970	01a0a2d1-1f16-70ac-ba15-09409253cb98	1	outcome	f	2026-09-15 02:06:49.122791+00	2026-09-17 09:53:19.249+00
01a0a2d1-1f27-72ef-ac01-2343b685d9a7	01a0a2d1-1f16-70ac-ba15-09409253cb98	2	criteria	f	2026-09-15 02:06:49.128939+00	2026-09-17 09:53:19.26+00
01a0a2d1-1f2e-70ae-9537-16562e374e84	01a0a2d1-1f16-70ac-ba15-09409253cb98	3	assessment	f	2026-09-15 02:06:49.134906+00	2026-09-17 09:53:19.271+00
01a0a2d1-1f39-76aa-a2ac-85db89b4eb99	01a0a2d1-1f33-771b-994e-794867afd540	0	True	t	2026-09-15 02:06:49.145852+00	2026-09-17 09:53:19.295+00
01a0a2d1-1f3e-75f6-bf9f-12fa7d4e70ca	01a0a2d1-1f33-771b-994e-794867afd540	1	False	f	2026-09-15 02:06:49.151818+00	2026-09-17 09:53:19.307+00
01a0a2d1-1f4a-72fd-ae64-f9b88c561a5e	01a0a2d1-1f44-7736-9031-049881d5deb9	0	analyze	t	2026-09-15 02:06:49.163437+00	2026-09-17 09:53:19.325+00
01a0a2d1-1f50-74b2-b964-b36f35061618	01a0a2d1-1f44-7736-9031-049881d5deb9	1	analyzed	t	2026-09-15 02:06:49.170231+00	2026-09-17 09:53:19.344+00
01a0a2d1-1f63-7513-8c82-faceb5d2eb32	01a0a2d1-1f57-737a-b22d-157dd1a7dcbe	1	very small	f	2026-09-15 02:06:49.188003+00	2026-09-17 09:53:19.386+00
01a0a2d1-1f68-74b5-8726-fbd22b11d932	01a0a2d1-1f57-737a-b22d-157dd1a7dcbe	2	temporary	f	2026-09-15 02:06:49.193655+00	2026-09-17 09:53:19.405+00
01a0a2d1-1f6e-71bd-80de-ab6a47563267	01a0a2d1-1f57-737a-b22d-157dd1a7dcbe	3	impossible to measure	f	2026-09-15 02:06:49.198665+00	2026-09-17 09:53:19.411+00
01a0a2d1-1fec-70a3-89a7-92bc946944f4	01a0a2d1-1fdf-7675-888d-a6995c1bce02	1	sleeps	f	2026-09-15 02:06:49.325382+00	2026-09-17 09:53:21.296+00
01a0a2d1-1ff8-71be-8b3b-d0e065491c7e	01a0a2d1-1fdf-7675-888d-a6995c1bce02	3	sleeping	f	2026-09-15 02:06:49.337268+00	2026-09-17 09:53:21.328+00
01a0a2d1-2014-7458-bb71-9c5637fe2f0b	01a0a2d1-200f-7223-994c-61806492bccc	0	I am working from home this month.	t	2026-09-15 02:06:49.365807+00	2026-09-17 09:53:21.401+00
01a0a2d1-1f7e-739c-b675-fe9404e5229e	01a0a2d1-1f78-7330-b5c3-e6fc3fccaa86	0	goes	t	2026-09-15 02:06:49.214719+00	2026-09-17 09:53:19.945+00
01a0a2d1-1f82-7478-8d0b-0e21b0ef2548	01a0a2d1-1f78-7330-b5c3-e6fc3fccaa86	1	go	f	2026-09-15 02:06:49.219411+00	2026-09-17 09:53:19.956+00
01a0a2d1-1e16-723f-8efc-14241dbed50f	01a0a2d1-1e02-770d-99cc-b5f7400cb8b8	1	nap	f	2026-09-15 02:06:48.855482+00	2026-09-17 09:53:18.671+00
01a0a2d1-1f87-7653-945a-ccaa38de5364	01a0a2d1-1f78-7330-b5c3-e6fc3fccaa86	2	going	f	2026-09-15 02:06:49.224601+00	2026-09-17 09:53:19.969+00
01a0a2d1-1e1c-72d4-b8cc-ad5cef89a67b	01a0a2d1-1e02-770d-99cc-b5f7400cb8b8	2	errand	f	2026-09-15 02:06:48.861788+00	2026-09-17 09:53:18.684+00
01a0a2d1-1f8e-75ac-ac6b-c9e2c1ae04c2	01a0a2d1-1f78-7330-b5c3-e6fc3fccaa86	3	gone	f	2026-09-15 02:06:49.231004+00	2026-09-17 09:53:19.984+00
01a0a2d1-1fbd-7484-a351-930c19148c54	01a0a2d1-1fb2-7092-9985-94bad432c6e1	1	Does she works here?	f	2026-09-15 02:06:49.27855+00	2026-09-17 09:53:20.084+00
01a0a2d1-1fc3-71ec-9020-31551023bf9d	01a0a2d1-1fb2-7092-9985-94bad432c6e1	2	She does work here?	f	2026-09-15 02:06:49.284385+00	2026-09-17 09:53:20.103+00
01a0a2d1-1fc9-72f9-a3a0-80ae432116c4	01a0a2d1-1fb2-7092-9985-94bad432c6e1	3	Work she here?	f	2026-09-15 02:06:49.28979+00	2026-09-17 09:53:20.115+00
01a0a2d1-204b-745c-a1ea-a7f210923e0c	01a0a2d1-2046-7228-9dbc-a0804540368c	0	went	t	2026-09-15 02:06:49.420541+00	2026-09-17 09:53:20.385+00
01a0a2d1-2050-734c-b80b-fe2d963ca38c	01a0a2d1-2046-7228-9dbc-a0804540368c	1	go	f	2026-09-15 02:06:49.425731+00	2026-09-17 09:53:20.397+00
01a0a2d1-2056-757b-ac60-c11b4fcf3720	01a0a2d1-2046-7228-9dbc-a0804540368c	2	goes	f	2026-09-15 02:06:49.430554+00	2026-09-17 09:53:20.41+00
01a0a2d1-205b-74c2-a1bb-5b8a6042e248	01a0a2d1-2046-7228-9dbc-a0804540368c	3	going	f	2026-09-15 02:06:49.435644+00	2026-09-17 09:53:20.422+00
01a0a2d1-2063-70be-85db-5f14652eae06	01a0a2d1-205f-7619-bbbb-76e438bf174e	0	didn't finish	t	2026-09-15 02:06:49.444426+00	2026-09-17 09:53:20.446+00
01a0a2d1-209b-74a3-b6bc-cf5ee3b61a32	01a0a2d1-2096-747e-bf4b-c9c62cecf535	0	have / been	t	2026-09-15 02:06:49.499803+00	2026-09-17 09:53:20.667+00
01a0a2d1-20a0-7173-9f27-e2c784af450f	01a0a2d1-2096-747e-bf4b-c9c62cecf535	1	has / been	f	2026-09-15 02:06:49.504931+00	2026-09-17 09:53:20.679+00
01a0a2d1-20a5-7019-bc60-53e04b219603	01a0a2d1-2096-747e-bf4b-c9c62cecf535	2	had / been	f	2026-09-15 02:06:49.509613+00	2026-09-17 09:53:20.691+00
01a0a2d1-20a9-756e-bbd8-d1043aa35fd0	01a0a2d1-2096-747e-bf4b-c9c62cecf535	3	have / went	f	2026-09-15 02:06:49.514322+00	2026-09-17 09:53:20.703+00
01a0a2d1-1e22-7564-a0e7-839c50bae560	01a0a2d1-1e02-770d-99cc-b5f7400cb8b8	3	routine	f	2026-09-15 02:06:48.867376+00	2026-09-17 09:53:18.697+00
01a0a2d1-1f98-7012-a2f6-2821684b100c	01a0a2d1-1f93-73a6-9c26-7c8d6cce0239	0	True	f	2026-09-15 02:06:49.242193+00	2026-09-17 09:53:20.009+00
01a0a2d1-1e2f-7762-9617-9ace63b98ca0	01a0a2d1-1e28-7510-9705-db2eff003a0c	0	True	f	2026-09-15 02:06:48.88064+00	2026-09-17 09:53:18.72+00
01a0a2d1-1e35-7621-ae06-cfa36ffdc4c8	01a0a2d1-1e28-7510-9705-db2eff003a0c	1	False	t	2026-09-15 02:06:48.886842+00	2026-09-17 09:53:18.732+00
01a0a2d1-1f9f-7031-894a-ceb444fc9a3b	01a0a2d1-1f93-73a6-9c26-7c8d6cce0239	1	False	t	2026-09-15 02:06:49.248383+00	2026-09-17 09:53:20.022+00
01a0a2d1-1fab-7011-b732-11560f1fcf1c	01a0a2d1-1fa5-772e-b7d2-e6cf11103dfb	0	doesn't like	t	2026-09-15 02:06:49.261065+00	2026-09-17 09:53:20.054+00
01a0a2d1-1fb8-75cb-8a61-f839f4f0220a	01a0a2d1-1fb2-7092-9985-94bad432c6e1	0	Does she work here?	t	2026-09-15 02:06:49.273158+00	2026-09-17 09:53:20.078+00
01a0a2d1-2026-72be-aa1d-36703f27907e	01a0a2d1-201a-738c-b47b-d65e8ea84a4d	1	He stays with his parents every year.	f	2026-09-15 02:06:49.382936+00	2026-09-15 07:02:05.01+00
01a0a2d1-202b-719c-bd5d-f35b5f2ccd91	01a0a2d1-201a-738c-b47b-d65e8ea84a4d	2	He stayed with his parents once.	f	2026-09-15 02:06:49.388425+00	2026-09-15 07:02:05.019+00
01a0a2d1-2035-75c5-bb51-027b55612af5	01a0a2d1-201a-738c-b47b-d65e8ea84a4d	3	He has stayed with his parents.	f	2026-09-15 02:06:49.398714+00	2026-09-15 07:02:05.027+00
01a0a2d1-20b3-74d6-83a3-2b459a166312	01a0a2d1-20ae-7583-959e-82d89b7459e5	0	True	f	2026-09-15 02:06:49.524452+00	2026-09-17 09:53:20.728+00
01a0a2d1-20b9-779f-a0dc-363c4e49534d	01a0a2d1-20ae-7583-959e-82d89b7459e5	1	False	t	2026-09-15 02:06:49.530122+00	2026-09-17 09:53:20.74+00
01a0a2d1-20c4-72e9-8351-1aa4c9fc2ba8	01a0a2d1-20bf-70a2-bb44-864991896189	0	has lived	t	2026-09-15 02:06:49.541501+00	2026-09-17 09:53:20.765+00
01a0a2d1-1fe6-7634-93f2-f52d961f2668	01a0a2d1-1fdf-7675-888d-a6995c1bce02	0	is sleeping	t	2026-09-15 02:06:49.319027+00	2026-09-17 09:53:21.283+00
01a0a2d1-1ff2-76d7-a1fd-b9138c135fc5	01a0a2d1-1fdf-7675-888d-a6995c1bce02	2	sleep	f	2026-09-15 02:06:49.331727+00	2026-09-17 09:53:21.315+00
01a0a2d1-2068-76b2-a23e-ac82c4fdfb86	01a0a2d1-205f-7619-bbbb-76e438bf174e	1	False	t	2026-09-15 02:06:49.448596+00	2026-09-15 07:02:05.088+00
01a0a2d1-2004-7549-8c35-8ee5249a5c99	01a0a2d1-1ffe-72d9-bff6-09e26bc6cc95	0	are studying	t	2026-09-15 02:06:49.34935+00	2026-09-17 09:53:21.369+00
01a0a2d1-207b-7065-99e5-fb3d296206cf	01a0a2d1-2075-700d-b418-a2ae66d41a0d	0	last week	t	2026-09-15 02:06:49.467781+00	2026-09-15 07:02:05.109+00
01a0a2d1-2080-742a-991c-1ffc7454f9a5	01a0a2d1-2075-700d-b418-a2ae66d41a0d	1	every day	f	2026-09-15 02:06:49.472582+00	2026-09-15 07:02:05.115+00
01a0a2d1-2084-7092-b849-03f49f704d2a	01a0a2d1-2075-700d-b418-a2ae66d41a0d	2	right now	f	2026-09-15 02:06:49.477152+00	2026-09-15 07:02:05.122+00
01a0a2d1-2088-702a-8c69-62038c85a327	01a0a2d1-2075-700d-b418-a2ae66d41a0d	3	so far	f	2026-09-15 02:06:49.481335+00	2026-09-15 07:02:05.128+00
01a0a2d1-200a-731d-9426-c1b4523630d7	01a0a2d1-1ffe-72d9-bff6-09e26bc6cc95	1	False	t	2026-09-15 02:06:49.354851+00	2026-09-17 09:53:19.52+00
01a0a2d1-1e43-771d-8e64-7bee4f45b87e	01a0a2d1-1e3c-73fa-938c-f40a2a52fe23	0	landlord	t	2026-09-15 02:06:48.900415+00	2026-09-17 09:53:18.757+00
01a0a2d1-2070-7101-9d74-2687d6663ca8	01a0a2d1-206c-7450-8183-a92aea970510	0	True	f	2026-09-15 02:06:49.457506+00	2026-09-17 09:53:20.471+00
01a0a2d1-1e4d-774f-b3e7-6e850e52c345	01a0a2d1-1e48-756e-8f47-7a7846117dc9	0	very tasty	t	2026-09-15 02:06:48.910626+00	2026-09-17 09:53:18.781+00
01a0a2d1-1e52-74cc-8598-a52d379ae949	01a0a2d1-1e48-756e-8f47-7a7846117dc9	1	too spicy	f	2026-09-15 02:06:48.915609+00	2026-09-17 09:53:18.793+00
01a0a2d1-1e57-75b8-afba-652c7c643d9b	01a0a2d1-1e48-756e-8f47-7a7846117dc9	2	cold	f	2026-09-15 02:06:48.920796+00	2026-09-17 09:53:18.805+00
01a0a2d1-1e5d-7288-b5aa-c634cee856d1	01a0a2d1-1e48-756e-8f47-7a7846117dc9	3	expensive	f	2026-09-15 02:06:48.927052+00	2026-09-17 09:53:18.811+00
01a0a2d1-1e79-71c3-b3cf-0c5b1690783b	01a0a2d1-1e69-7128-98b1-65d11152081c	2	don't understand	f	2026-09-15 02:06:48.953923+00	2026-09-17 09:53:18.88+00
01a0a2d1-1e7d-70f4-939c-cc03afe5e529	01a0a2d1-1e69-7128-98b1-65d11152081c	3	are angry	f	2026-09-15 02:06:48.958469+00	2026-09-17 09:53:18.892+00
01a0a2d1-20fe-71ac-914c-4bb317cfe1b5	01a0a2d1-20f2-778d-810c-7043eccb69e0	1	will has	f	2026-09-15 02:06:49.599397+00	2026-09-15 07:02:05.281+00
01a0a2d1-2103-763d-aa8b-577b63e8d20d	01a0a2d1-20f2-778d-810c-7043eccb69e0	2	is	f	2026-09-15 02:06:49.604191+00	2026-09-15 07:02:05.288+00
01a0a2d1-2108-74b8-82fa-f218e45282d1	01a0a2d1-20f2-778d-810c-7043eccb69e0	3	was going to	f	2026-09-15 02:06:49.610032+00	2026-09-15 07:02:05.295+00
01a0a2d1-2118-759d-81ea-1160a5d94ad8	01a0a2d1-2112-716f-b214-e606ef788252	0	True	f	2026-09-15 02:06:49.625048+00	2026-09-15 07:02:05.31+00
01a0a2d1-211e-762e-b85d-10dad3c89dde	01a0a2d1-2112-716f-b214-e606ef788252	1	False	t	2026-09-15 02:06:49.631073+00	2026-09-15 07:02:05.318+00
01a0a2d1-2128-743e-a0ba-d2b739083d22	01a0a2d1-2123-7664-9dc4-869d1357a0ff	0	will get	t	2026-09-15 02:06:49.640625+00	2026-09-15 07:02:05.334+00
01a0a2d1-212d-7374-95ff-af313b1bd053	01a0a2d1-2123-7664-9dc4-869d1357a0ff	1	'll get	t	2026-09-15 02:06:49.646925+00	2026-09-15 07:02:05.34+00
01a0a2d1-2139-7779-8c4d-5fafe8aea4a7	01a0a2d1-2133-765e-b68f-266ade52acbe	0	We're flying to Da Nang on Friday.	t	2026-09-15 02:06:49.658549+00	2026-09-15 07:02:05.351+00
01a0a2d1-2140-72d6-b6d9-bc8812c87d89	01a0a2d1-2133-765e-b68f-266ade52acbe	1	We will maybe fly somewhere.	f	2026-09-15 02:06:49.665848+00	2026-09-15 07:02:05.358+00
01a0a2d1-2146-7400-b427-f887d30121e4	01a0a2d1-2133-765e-b68f-266ade52acbe	2	We fly to Da Nang every year.	f	2026-09-15 02:06:49.670675+00	2026-09-15 07:02:05.365+00
01a0a2d1-214b-723d-8f9e-8c0579907361	01a0a2d1-2133-765e-b68f-266ade52acbe	3	We have flown to Da Nang before.	f	2026-09-15 02:06:49.67649+00	2026-09-15 07:02:05.372+00
01a0a2d1-2307-748a-8813-a07df665b06c	01a0a2d1-22fb-77e4-b665-e305e3b51c7f	1	a	f	2026-09-15 02:06:50.119675+00	2026-09-17 09:53:20.917+00
01a0a2d1-230c-71fc-8b02-52c25b774ebb	01a0a2d1-22fb-77e4-b665-e305e3b51c7f	2	the	f	2026-09-15 02:06:50.125067+00	2026-09-17 09:53:20.935+00
01a0a2d1-2311-753a-8a07-8f5bcd9fee3d	01a0a2d1-22fb-77e4-b665-e305e3b51c7f	3	no article	f	2026-09-15 02:06:50.12996+00	2026-09-17 09:53:20.948+00
01a0a2d1-231a-74cd-9a9e-8cd26977188d	01a0a2d1-2316-70c8-808a-f1bc63f83a94	0	a	t	2026-09-15 02:06:50.139415+00	2026-09-17 09:53:20.973+00
01a0a2d1-232a-7051-8a2f-7f6f00dd489f	01a0a2d1-2324-71d6-8ebd-18d939dc9174	0	The	t	2026-09-15 02:06:50.155249+00	2026-09-17 09:53:20.998+00
01a0a2d1-23b4-7263-9dcf-f6f4b9885771	01a0a2d1-23af-7614-a219-c32aa0653e62	0	6.50	t	2026-09-15 02:06:50.293891+00	2026-09-17 09:53:26.07+00
01a0a2d1-23ba-723b-81d8-723897e1f154	01a0a2d1-23af-7614-a219-c32aa0653e62	1	six dollars fifty	t	2026-09-15 02:06:50.299038+00	2026-09-17 09:53:26.079+00
01a0a2d1-2194-75d2-923b-a001b5c09fcc	01a0a2d1-218f-723b-a03c-3d4637e155b9	0	It might rain this afternoon.	t	2026-09-15 02:06:49.749258+00	2026-09-15 07:02:05.469+00
01a0a2d1-219e-745b-be45-a83e1e5d65cb	01a0a2d1-218f-723b-a03c-3d4637e155b9	2	It rains this afternoon.	f	2026-09-15 02:06:49.759724+00	2026-09-15 07:02:05.488+00
01a0a2d1-21a3-733f-8a4c-0fd3e955189c	01a0a2d1-218f-723b-a03c-3d4637e155b9	3	It has rained this afternoon.	f	2026-09-15 02:06:49.764231+00	2026-09-15 07:02:05.494+00
01a0a2d1-21b6-71cb-b499-951d7c1bb7e6	01a0a2d1-21b1-750d-b584-e37d1b85b6ed	0	had	t	2026-09-15 02:06:49.782599+00	2026-09-15 07:02:05.517+00
01a0a2d1-21ba-772a-b6b9-22a80736bcd5	01a0a2d1-21b1-750d-b584-e37d1b85b6ed	1	have	f	2026-09-15 02:06:49.786989+00	2026-09-15 07:02:05.522+00
01a0a2d1-21be-7690-982f-db228992572c	01a0a2d1-21b1-750d-b584-e37d1b85b6ed	2	will have	f	2026-09-15 02:06:49.791385+00	2026-09-15 07:02:05.529+00
01a0a2d1-21c4-7497-a809-53fa87c51f0b	01a0a2d1-21b1-750d-b584-e37d1b85b6ed	3	would have	f	2026-09-15 02:06:49.797024+00	2026-09-15 07:02:05.536+00
01a0a2d1-21cd-7062-8be0-0ea1f2578053	01a0a2d1-21c9-754c-ad04-66023c427991	0	True	f	2026-09-15 02:06:49.806412+00	2026-09-15 07:02:05.549+00
01a0a2d1-21d2-7678-834c-475d214f6392	01a0a2d1-21c9-754c-ad04-66023c427991	1	False	t	2026-09-15 02:06:49.810933+00	2026-09-15 07:02:05.556+00
01a0a2d1-21db-753b-9c28-e752b72155bc	01a0a2d1-21d7-7471-b938-a3462fad82f8	0	boils	t	2026-09-15 02:06:49.820142+00	2026-09-15 07:02:05.569+00
01a0a2d1-21eb-73d4-a109-94de2f1cfc33	01a0a2d1-21e0-76e8-860d-b9e54db439c0	0	First conditional	t	2026-09-15 02:06:49.835794+00	2026-09-15 07:02:05.583+00
01a0a2d1-21f3-7119-8623-d5636bee2394	01a0a2d1-21e0-76e8-860d-b9e54db439c0	1	Zero conditional	f	2026-09-15 02:06:49.844315+00	2026-09-15 07:02:05.59+00
01a0a2d1-21ff-7443-96e2-625ed080dd48	01a0a2d1-21e0-76e8-860d-b9e54db439c0	2	Second conditional	f	2026-09-15 02:06:49.855642+00	2026-09-15 07:02:05.596+00
01a0a2d1-220c-71de-9e21-dbf47da049ca	01a0a2d1-21e0-76e8-860d-b9e54db439c0	3	Third conditional	f	2026-09-15 02:06:49.869617+00	2026-09-15 07:02:05.603+00
01a0a2d1-222f-73cb-8fb1-e55189952600	01a0a2d1-2227-7686-a90c-76bdde495138	0	is sung	t	2026-09-15 02:06:49.904874+00	2026-09-15 07:02:05.634+00
01a0a2d1-2236-7185-a1a1-2d6c8af8bcb1	01a0a2d1-2227-7686-a90c-76bdde495138	1	sings	f	2026-09-15 02:06:49.911563+00	2026-09-15 07:02:05.638+00
01a0a2d1-223c-7283-9285-76c179c35325	01a0a2d1-2227-7686-a90c-76bdde495138	2	is singing	f	2026-09-15 02:06:49.91791+00	2026-09-15 07:02:05.643+00
01a0a2d1-2242-7677-8ef1-da9011b7c016	01a0a2d1-2227-7686-a90c-76bdde495138	3	sung	f	2026-09-15 02:06:49.923886+00	2026-09-15 07:02:05.647+00
01a0a2d1-2251-76b8-b5cb-537efbd1c0a1	01a0a2d1-224a-71f5-90af-aaa36c523617	0	True	f	2026-09-15 02:06:49.938884+00	2026-09-15 07:02:05.655+00
01a0a2d1-2257-776e-8757-aa0e353c8192	01a0a2d1-224a-71f5-90af-aaa36c523617	1	False	t	2026-09-15 02:06:49.944538+00	2026-09-15 07:02:05.659+00
01a0a2d1-2265-72ec-99e2-b3864392564b	01a0a2d1-225d-7000-9e7e-95fee84c268f	0	was built	t	2026-09-15 02:06:49.958147+00	2026-09-15 07:02:05.668+00
01a0a2d1-2272-74b3-b6b8-a1585c1f28b9	01a0a2d1-226b-7062-a506-411987e3795c	0	The window was broken last night.	t	2026-09-15 02:06:49.97125+00	2026-09-15 07:02:05.677+00
01a0a2d1-2278-74a9-a483-fdc30ac1c55e	01a0a2d1-226b-7062-a506-411987e3795c	1	I broke the window last night.	f	2026-09-15 02:06:49.977283+00	2026-09-15 07:02:05.681+00
01a0a2d1-2280-7438-b180-000d3254f7a5	01a0a2d1-226b-7062-a506-411987e3795c	2	I am breaking the window.	f	2026-09-15 02:06:49.985505+00	2026-09-15 07:02:05.685+00
01a0a2d1-2286-70ae-9f3d-ce7559a94a5b	01a0a2d1-226b-7062-a506-411987e3795c	3	I will break the window.	f	2026-09-15 02:06:49.991311+00	2026-09-15 07:02:05.689+00
01a0a2d1-2170-710e-9dd0-e31fe5dfb582	01a0a2d1-215f-7683-a978-84a4c789ea8e	2	must to	f	2026-09-15 02:06:49.713617+00	2026-09-17 09:53:19.748+00
01a0a2d1-2175-77f0-aaba-3733a80b9c6f	01a0a2d1-215f-7683-a978-84a4c789ea8e	3	can to	f	2026-09-15 02:06:49.718143+00	2026-09-17 09:53:19.761+00
01a0a2d1-217e-76ef-be4e-85f3fa80cc16	01a0a2d1-217a-72aa-80b6-c183729eb140	0	True	f	2026-09-15 02:06:49.72712+00	2026-09-17 09:53:19.785+00
01a0a2d1-2183-742a-9379-87d0f18f505a	01a0a2d1-217a-72aa-80b6-c183729eb140	1	False	t	2026-09-15 02:06:49.731596+00	2026-09-17 09:53:19.797+00
01a0a2d1-218b-72d0-a7cd-283c7b206f18	01a0a2d1-2187-77f6-9e44-471158085441	0	Can	t	2026-09-15 02:06:49.740071+00	2026-09-17 09:53:19.822+00
01a0a2d1-22c6-70d0-95e0-05c187660cef	01a0a2d1-22bd-7671-bc05-e21b3356a592	1	False	t	2026-09-15 02:06:50.055295+00	2026-09-15 07:02:05.745+00
01a0a2d1-2301-7382-8ccd-a8073ac5e1fe	01a0a2d1-22fb-77e4-b665-e305e3b51c7f	0	an	t	2026-09-15 02:06:50.11388+00	2026-09-17 09:53:20.904+00
01a0a2d1-22e0-772e-8005-68109bbb42f9	01a0a2d1-22d5-76f4-a335-084583fe4846	1	This bag is more cheap than that one.	f	2026-09-15 02:06:50.08101+00	2026-09-15 07:02:05.774+00
01a0a2d1-22e5-72f5-b1b5-254a43389ed2	01a0a2d1-22d5-76f4-a335-084583fe4846	2	This bag is cheap than that one.	f	2026-09-15 02:06:50.086181+00	2026-09-15 07:02:05.781+00
01a0a2d1-22eb-7197-84bc-f6b45084317c	01a0a2d1-22d5-76f4-a335-084583fe4846	3	This bag is cheapest than that one.	f	2026-09-15 02:06:50.092232+00	2026-09-15 07:02:05.787+00
01a0a2d1-2382-72e3-9564-a4e4337c5d28	01a0a2d1-237d-7367-bd14-7749c5079a5a	0	Medium	t	2026-09-15 02:06:50.244357+00	2026-09-17 09:53:25.944+00
01a0a2d1-2389-73b5-90be-d95ca23cd660	01a0a2d1-237d-7367-bd14-7749c5079a5a	1	Small	f	2026-09-15 02:06:50.249559+00	2026-09-17 09:53:25.956+00
01a0a2d1-238d-7053-8773-9651a053d8f0	01a0a2d1-237d-7367-bd14-7749c5079a5a	2	Large	f	2026-09-15 02:06:50.254748+00	2026-09-17 09:53:25.971+00
01a0a2d1-2393-72b0-9949-0e0c30182806	01a0a2d1-237d-7367-bd14-7749c5079a5a	3	Extra large	f	2026-09-15 02:06:50.260525+00	2026-09-17 09:53:25.985+00
01a0a2d1-23a4-72d5-b0fe-5c99e42d37e3	01a0a2d1-239e-7162-bd8f-f59e1ff06479	0	True	f	2026-09-15 02:06:50.27701+00	2026-09-17 09:53:26.018+00
01a0a2d1-231f-734b-9cb4-af18a9bb81c5	01a0a2d1-2316-70c8-808a-f1bc63f83a94	1	False	t	2026-09-15 02:06:50.144045+00	2026-09-15 07:02:05.85+00
01a0a2d1-23aa-7725-8898-318e7ae39117	01a0a2d1-239e-7162-bd8f-f59e1ff06479	1	False	t	2026-09-15 02:06:50.282612+00	2026-09-17 09:53:26.034+00
01a0a2d1-2346-729c-849b-6e648726f3ef	01a0a2d1-2335-74cb-ab1b-9947367aded5	2	A dogs are loyal animals.	f	2026-09-15 02:06:50.183014+00	2026-09-15 07:02:05.892+00
01a0a2d1-234b-76bf-b008-646a6c91c0b4	01a0a2d1-2335-74cb-ab1b-9947367aded5	3	An dogs are loyal animals.	f	2026-09-15 02:06:50.187654+00	2026-09-15 07:02:05.898+00
01a0a2d1-22a2-731e-b2dd-1a567f1cf58c	01a0a2d1-229c-71d2-9ee3-d5a852c2b8cc	0	cheaper	t	2026-09-15 02:06:50.019468+00	2026-09-17 09:53:19.589+00
01a0a2d1-22a7-715d-a280-59f8dc14115a	01a0a2d1-229c-71d2-9ee3-d5a852c2b8cc	1	more cheap	f	2026-09-15 02:06:50.024564+00	2026-09-17 09:53:19.601+00
01a0a2d1-22ae-71ad-bfc4-aec026f39a63	01a0a2d1-229c-71d2-9ee3-d5a852c2b8cc	2	cheapest	f	2026-09-15 02:06:50.030699+00	2026-09-17 09:53:19.614+00
01a0a2d1-22b7-7740-ae2b-622dc80404dd	01a0a2d1-229c-71d2-9ee3-d5a852c2b8cc	3	cheap	f	2026-09-15 02:06:50.040637+00	2026-09-17 09:53:19.626+00
01a0a2d1-22c2-75e0-966b-7c7a5a565945	01a0a2d1-22bd-7671-bc05-e21b3356a592	0	tallest	t	2026-09-15 02:06:50.050849+00	2026-09-17 09:53:19.65+00
01a0a2d1-22d0-72c1-a0f2-70567fca0184	01a0a2d1-22cb-74da-b223-103b664ee256	0	True	f	2026-09-15 02:06:50.065054+00	2026-09-17 09:53:19.675+00
01a0a2d1-2166-73ee-bfad-aa4241af023e	01a0a2d1-215f-7683-a978-84a4c789ea8e	0	should	t	2026-09-15 02:06:49.702995+00	2026-09-17 09:53:19.724+00
01a0a2d1-216b-71e8-b4a7-b8433c474a69	01a0a2d1-215f-7683-a978-84a4c789ea8e	1	should to	f	2026-09-15 02:06:49.707891+00	2026-09-17 09:53:19.736+00
01a0a2d1-23d3-714b-a45a-bea72745ffa8	01a0a2d1-23cd-74dc-9358-edeb9b06f7e3	0	He went hiking.	t	2026-09-15 02:06:50.323794+00	2026-09-17 09:53:26.14+00
01a0a2d1-20d5-712a-9ef6-c859598f4731	01a0a2d1-20ca-746a-86f4-725fdcae425d	1	a specific trip last year	f	2026-09-15 02:06:49.559161+00	2026-09-15 07:02:05.231+00
01a0a2d1-20dc-758e-b9dc-1f2403c23ab1	01a0a2d1-20ca-746a-86f4-725fdcae425d	2	a plan for next year	f	2026-09-15 02:06:49.564924+00	2026-09-15 07:02:05.239+00
01a0a2d1-20f7-72b5-a2b7-c300ebe19396	01a0a2d1-20f2-778d-810c-7043eccb69e0	0	is going to	t	2026-09-15 02:06:49.593227+00	2026-09-15 07:02:05.274+00
01a0a2d1-2340-71ff-b9d7-18599b4b5647	01a0a2d1-2335-74cb-ab1b-9947367aded5	1	The dogs are loyal animals.	f	2026-09-15 02:06:50.177878+00	2026-09-15 07:02:05.886+00
01a0a2d1-23d7-705b-99b7-a57e565e0d15	01a0a2d1-23cd-74dc-9358-edeb9b06f7e3	1	He stayed home and read.	f	2026-09-15 02:06:50.328609+00	2026-09-17 09:53:26.152+00
01a0a2d1-23dc-7347-a4b1-596e42001280	01a0a2d1-23cd-74dc-9358-edeb9b06f7e3	2	He worked all weekend.	f	2026-09-15 02:06:50.333387+00	2026-09-17 09:53:26.164+00
01a0a2d1-23e1-75b6-bace-311499aeec4d	01a0a2d1-23cd-74dc-9358-edeb9b06f7e3	3	He traveled abroad.	f	2026-09-15 02:06:50.338127+00	2026-09-17 09:53:26.169+00
01a0a2d1-23eb-7406-bcf7-09c25a140423	01a0a2d1-23e6-7052-abaf-6abec9ea35e4	0	True	f	2026-09-15 02:06:50.348261+00	2026-09-17 09:53:26.192+00
01a0a2d1-24bc-76f0-9fe4-660b92dd74c6	01a0a2d1-24b7-7165-b8e1-4ff5f67c91f7	0	True	t	2026-09-15 02:06:50.556575+00	2026-09-17 09:53:26.549+00
01a0a2d1-24c0-7337-8d99-f6e40cf49d3e	01a0a2d1-24b7-7165-b8e1-4ff5f67c91f7	1	False	f	2026-09-15 02:06:50.561403+00	2026-09-17 09:53:26.56+00
01a0a2d1-24ca-77d0-bda4-d90fd64c9c05	01a0a2d1-24c5-7004-ada9-c3bdd7e91ad5	0	coastal	t	2026-09-15 02:06:50.571678+00	2026-09-17 09:53:26.573+00
01a0a2d1-23f1-703a-9703-de076c2cc5df	01a0a2d1-23e6-7052-abaf-6abec9ea35e4	1	False	t	2026-09-15 02:06:50.354052+00	2026-09-17 09:53:26.201+00
01a0a2d1-23fd-714b-be92-d17c21684d30	01a0a2d1-23f7-7544-89eb-87f410ba88b3	0	Friday	t	2026-09-15 02:06:50.36567+00	2026-09-17 09:53:26.225+00
01a0a2d1-2412-7366-a424-8409ad508cea	01a0a2d1-240d-73df-b938-327cbbd508f1	0	22 kg	t	2026-09-15 02:06:50.387343+00	2026-09-17 09:53:26.266+00
01a0a2d1-2417-7041-b989-c604255989e2	01a0a2d1-240d-73df-b938-327cbbd508f1	1	12 kg	f	2026-09-15 02:06:50.392438+00	2026-09-17 09:53:26.277+00
01a0a2d1-2422-7113-a8f9-a4548ad5d391	01a0a2d1-240d-73df-b938-327cbbd508f1	2	30 kg	f	2026-09-15 02:06:50.403861+00	2026-09-17 09:53:26.286+00
01a0a2d1-242a-7458-b039-56d5d6152790	01a0a2d1-240d-73df-b938-327cbbd508f1	3	25 kg	f	2026-09-15 02:06:50.411853+00	2026-09-17 09:53:26.291+00
01a0a2d1-243c-71f1-b42a-d94be2602505	01a0a2d1-2437-73ba-8773-29efe871bfa2	0	True	f	2026-09-15 02:06:50.429584+00	2026-09-17 09:53:26.315+00
01a0a2d1-2441-763b-82d5-8133917b12c2	01a0a2d1-2437-73ba-8773-29efe871bfa2	1	False	t	2026-09-15 02:06:50.434433+00	2026-09-17 09:53:26.323+00
01a0a2d1-244b-74a0-a494-7c001cbaddb7	01a0a2d1-2446-73d7-b08f-4c818f3a8d20	0	14	t	2026-09-15 02:06:50.444379+00	2026-09-17 09:53:26.34+00
01a0a2d1-2461-76a0-9a34-614ff77943f1	01a0a2d1-245c-722d-bb7a-e05d94a0effd	0	At the pharmacy	t	2026-09-15 02:06:50.466514+00	2026-09-17 09:53:26.384+00
01a0a2d1-2466-716a-8f5b-1116c6791218	01a0a2d1-245c-722d-bb7a-e05d94a0effd	1	At the park	f	2026-09-15 02:06:50.471139+00	2026-09-17 09:53:26.389+00
01a0a2d1-246b-7711-99fa-291e94b9fac0	01a0a2d1-245c-722d-bb7a-e05d94a0effd	2	At the station	f	2026-09-15 02:06:50.476623+00	2026-09-17 09:53:26.401+00
01a0a2d1-2471-704d-b121-8566b035226c	01a0a2d1-245c-722d-bb7a-e05d94a0effd	3	At the bank	f	2026-09-15 02:06:50.482775+00	2026-09-17 09:53:26.413+00
01a0a2d1-247c-7289-a0f1-7dc5e817ae58	01a0a2d1-2477-70d9-a1f2-df4a78d29c86	0	True	f	2026-09-15 02:06:50.493381+00	2026-09-17 09:53:26.433+00
01a0a2d1-1e0c-72bf-a247-b042fbc9c2cb	01a0a2d1-1e02-770d-99cc-b5f7400cb8b8	0	chore	t	2026-09-15 02:06:48.846431+00	2026-09-17 09:53:18.65+00
01a0a2d1-1e74-74aa-a903-369c7cc1b340	01a0a2d1-1e69-7128-98b1-65d11152081c	1	have the same opinion	f	2026-09-15 02:06:48.949313+00	2026-09-17 09:53:18.867+00
01a0a2d1-2481-7313-8587-6dbc0364e30e	01a0a2d1-2477-70d9-a1f2-df4a78d29c86	1	False	t	2026-09-15 02:06:50.498378+00	2026-09-17 09:53:26.438+00
01a0a2d1-20d0-74b0-a726-6746b9d60bbb	01a0a2d1-20ca-746a-86f4-725fdcae425d	0	a life experience, any time up to now	t	2026-09-15 02:06:49.553269+00	2026-09-15 07:02:05.224+00
01a0a2d1-20e1-768b-8c7e-a47ed33c0317	01a0a2d1-20ca-746a-86f4-725fdcae425d	3	something happening right now	f	2026-09-15 02:06:49.570203+00	2026-09-15 07:02:05.245+00
01a0a2d1-2199-74ae-879e-3daed00339b4	01a0a2d1-218f-723b-a03c-3d4637e155b9	1	It must rain this afternoon.	f	2026-09-15 02:06:49.754125+00	2026-09-15 07:02:05.481+00
01a0a2d1-22db-70f1-a0c2-16c51ed8ad5e	01a0a2d1-22d5-76f4-a335-084583fe4846	0	This bag is cheaper than that one.	t	2026-09-15 02:06:50.076101+00	2026-09-15 07:02:05.768+00
01a0a3df-630b-726d-ac8b-7c26656d098f	01a0a3df-6302-775d-8b2c-0ad2c0f49ad4	1	False	t	2026-09-15 07:02:01.227509+00	2026-09-15 07:02:05.967+00
01a0a3df-6326-703c-8e87-3f601a4176eb	01a0a3df-631d-70ec-8add-2a648d7b134d	1	Did you were waiting for the bus?	f	2026-09-15 07:02:01.25534+00	2026-09-15 07:02:05.997+00
01a0a3df-632b-75ea-83a4-6018106a164b	01a0a3df-631d-70ec-8add-2a648d7b134d	2	Was you waiting for the bus?	f	2026-09-15 07:02:01.259929+00	2026-09-15 07:02:06.004+00
01a0a2d1-1f5e-75a9-a284-26b2f34fc646	01a0a2d1-1f57-737a-b22d-157dd1a7dcbe	0	large and noticeable	t	2026-09-15 02:06:49.183207+00	2026-09-17 09:53:19.374+00
01a0a2d1-2330-7039-9916-7f1cbbf828ae	01a0a2d1-2324-71d6-8ebd-18d939dc9174	1	A	f	2026-09-15 02:06:50.161453+00	2026-09-17 09:53:21.009+00
01a0a2d1-233a-71ac-957b-4b652afd575b	01a0a2d1-2335-74cb-ab1b-9947367aded5	0	the	t	2026-09-15 02:06:50.171392+00	2026-09-17 09:53:21.071+00
01a0a2d1-2020-7104-9e39-ceec2e41caf3	01a0a2d1-201a-738c-b47b-d65e8ea84a4d	0	Is she cooking	t	2026-09-15 02:06:49.377702+00	2026-09-17 09:53:21.463+00
01a0a3df-62ee-705a-b5d9-749edc74f117	01a0a3df-62e8-73a0-9c7e-9adaf47d44dc	0	was studying	t	2026-09-15 07:02:01.199139+00	2026-09-17 09:53:21.695+00
01a0a3df-62f3-7097-a62a-f086e5c9fe9e	01a0a3df-62e8-73a0-9c7e-9adaf47d44dc	1	studied	f	2026-09-15 07:02:01.203927+00	2026-09-17 09:53:21.708+00
01a0a3df-62f7-7036-a3a3-2f4f6b95ff71	01a0a3df-62e8-73a0-9c7e-9adaf47d44dc	2	am studying	f	2026-09-15 07:02:01.208033+00	2026-09-17 09:53:21.721+00
01a0a3df-62fc-7247-9b0f-fc43dba7d41d	01a0a3df-62e8-73a0-9c7e-9adaf47d44dc	3	were studying	f	2026-09-15 07:02:01.213417+00	2026-09-17 09:53:21.732+00
01a0a3df-6306-764e-9e55-92f18e621e22	01a0a3df-6302-775d-8b2c-0ad2c0f49ad4	0	were playing	t	2026-09-15 07:02:01.223109+00	2026-09-17 09:53:21.756+00
01a0a2d1-248c-7053-8bf3-06f09219ab19	01a0a2d1-2487-72bb-839a-c62bed0e2334	0	right	t	2026-09-15 02:06:50.50939+00	2026-09-17 09:53:26.458+00
01a0a2d1-24a3-77b1-ba14-7846b2a07157	01a0a2d1-249d-7398-ba4a-af0c1ebe169d	0	Climate change and its economic impact	t	2026-09-15 02:06:50.532179+00	2026-09-17 09:53:26.494+00
01a0a2d1-24a8-7170-adc0-cc0828653256	01a0a2d1-249d-7398-ba4a-af0c1ebe169d	1	The history of universities	f	2026-09-15 02:06:50.53705+00	2026-09-17 09:53:26.507+00
01a0a2d1-24ad-7729-b075-d23183ee9548	01a0a2d1-249d-7398-ba4a-af0c1ebe169d	2	Rising college tuition	f	2026-09-15 02:06:50.542706+00	2026-09-17 09:53:26.512+00
01a0a2d1-24b2-74ba-887f-63b9e6f75579	01a0a2d1-249d-7398-ba4a-af0c1ebe169d	3	Renewable energy technology	f	2026-09-15 02:06:50.547504+00	2026-09-17 09:53:26.532+00
01a0a3df-6314-742e-b786-a0b2b49ec895	01a0a3df-630f-72af-8a6b-cc72fee0b8d6	0	was sleeping	t	2026-09-15 07:02:01.236775+00	2026-09-17 09:53:21.781+00
01a0a3df-6318-7051-94d1-438f6e046fbf	01a0a3df-630f-72af-8a6b-cc72fee0b8d6	1	slept	f	2026-09-15 07:02:01.240997+00	2026-09-17 09:53:21.793+00
01a0a3df-6322-76ac-9522-dd64cf8e169b	01a0a3df-631d-70ec-8add-2a648d7b134d	0	were you doing	t	2026-09-15 07:02:01.251074+00	2026-09-17 09:53:21.843+00
01a0a3df-6344-760c-a1d9-80a28ac4932b	01a0a3df-633e-7289-b2d2-e1bad2c814dc	0	had completed	t	2026-09-15 07:02:01.284826+00	2026-09-15 07:02:06.037+00
01a0a3df-6348-7567-82af-c08e699d724e	01a0a3df-633e-7289-b2d2-e1bad2c814dc	1	has completed	f	2026-09-15 07:02:01.289388+00	2026-09-15 07:02:06.042+00
01a0a3df-634d-70ca-b8c2-472d9367b8a9	01a0a3df-633e-7289-b2d2-e1bad2c814dc	2	completes	f	2026-09-15 07:02:01.293935+00	2026-09-15 07:02:06.048+00
01a0a3df-6351-73ab-b445-d4233cd853c7	01a0a3df-633e-7289-b2d2-e1bad2c814dc	3	was completing	f	2026-09-15 07:02:01.298475+00	2026-09-15 07:02:06.054+00
01a0a3df-635b-744a-8f23-fd6b2fbc2c85	01a0a3df-6356-77e3-9804-0146a8205c55	0	True	f	2026-09-15 07:02:01.30745+00	2026-09-15 07:02:06.066+00
01a0a3df-635f-7365-86de-b81289c13092	01a0a3df-6356-77e3-9804-0146a8205c55	1	False	t	2026-09-15 07:02:01.311578+00	2026-09-15 07:02:06.074+00
01a0a3df-6368-7199-8394-310ac37a3fcd	01a0a3df-6363-7613-9541-6778fc5eefd4	0	hadn't met	t	2026-09-15 07:02:01.320738+00	2026-09-15 07:02:06.088+00
01a0a3df-6376-730e-b0ac-7e683076b587	01a0a3df-6371-710a-9ccb-7646d9327b1f	0	I realised I had left my keys at home.	t	2026-09-15 07:02:01.334955+00	2026-09-15 07:02:06.103+00
01a0a3df-637a-7577-8352-5c5d81278ca2	01a0a3df-6371-710a-9ccb-7646d9327b1f	1	I had realised I left my keys at home.	f	2026-09-15 07:02:01.339145+00	2026-09-15 07:02:06.108+00
01a0a3df-637f-73ea-962c-a479e9f9e452	01a0a3df-6371-710a-9ccb-7646d9327b1f	2	I realise I had leave my keys at home.	f	2026-09-15 07:02:01.343572+00	2026-09-15 07:02:06.113+00
01a0a3df-6383-7651-96bb-4d801fc2b461	01a0a3df-6371-710a-9ccb-7646d9327b1f	3	I realised I have left my keys at home yesterday.	f	2026-09-15 07:02:01.348038+00	2026-09-15 07:02:06.118+00
01a0a3df-6396-74e4-8081-bd3ed312d0aa	01a0a3df-6391-70d9-bc01-cfef6f291c21	0	used to	t	2026-09-15 07:02:01.366839+00	2026-09-15 07:02:06.139+00
01a0a3df-639a-75ba-ae86-5525eb91d474	01a0a3df-6391-70d9-bc01-cfef6f291c21	1	use to	f	2026-09-15 07:02:01.371349+00	2026-09-15 07:02:06.144+00
01a0a3df-639f-7168-b51d-cb7c59b8bacf	01a0a3df-6391-70d9-bc01-cfef6f291c21	2	is used to	f	2026-09-15 07:02:01.375604+00	2026-09-15 07:02:06.15+00
01a0a3df-63a3-7797-9c38-d09c41d61e3f	01a0a3df-6391-70d9-bc01-cfef6f291c21	3	uses to	f	2026-09-15 07:02:01.379928+00	2026-09-15 07:02:06.155+00
01a0a3df-63b1-7163-b344-733016324e18	01a0a3df-63a8-734c-ac96-940cc9339341	0	True	f	2026-09-15 07:02:01.394457+00	2026-09-15 07:02:06.168+00
01a0a3df-63b6-73a5-b412-e2e4c21e25ba	01a0a3df-63a8-734c-ac96-940cc9339341	1	False	t	2026-09-15 07:02:01.399079+00	2026-09-15 07:02:06.173+00
01a0a3df-63bf-71ff-bd4f-d969fd64eb20	01a0a3df-63bb-74ac-b9dc-4e535fd7b56b	0	didn't use to like	t	2026-09-15 07:02:01.408154+00	2026-09-15 07:02:06.185+00
01a0a3df-63c4-77de-97ab-5acfc0f38e71	01a0a3df-63bb-74ac-b9dc-4e535fd7b56b	1	did not use to like	t	2026-09-15 07:02:01.412831+00	2026-09-15 07:02:06.191+00
01a0a3df-63cd-71ad-83c6-52ca468dbab7	01a0a3df-63c9-7129-b201-2e520332c4b9	0	I used to get up at 5 a.m.	t	2026-09-15 07:02:01.422224+00	2026-09-15 07:02:06.204+00
01a0a3df-63d2-7695-acdf-2d959ce444c0	01a0a3df-63c9-7129-b201-2e520332c4b9	1	I am used to get up at 5 a.m.	f	2026-09-15 07:02:01.426964+00	2026-09-15 07:02:06.21+00
01a0a3df-63d7-7779-bfcb-b1012a875330	01a0a3df-63c9-7129-b201-2e520332c4b9	2	I use to getting up at 5 a.m.	f	2026-09-15 07:02:01.432484+00	2026-09-15 07:02:06.217+00
01a0a3df-63dc-7307-980a-dda653cd3830	01a0a3df-63c9-7129-b201-2e520332c4b9	3	I used getting up at 5 a.m.	f	2026-09-15 07:02:01.437465+00	2026-09-15 07:02:06.224+00
01a0a3df-6491-75b4-b483-e46d7b7eb55b	01a0a3df-648d-7499-b0a9-ca80bbb97cf2	0	learning	t	2026-09-15 07:02:01.618033+00	2026-09-17 09:53:25.233+00
01a0a3df-6495-7614-8be1-84bcf6828d1f	01a0a3df-648d-7499-b0a9-ca80bbb97cf2	1	to learning	f	2026-09-15 07:02:01.622211+00	2026-09-17 09:53:25.239+00
01a0a3df-649a-750d-9274-2fc0bb411671	01a0a3df-648d-7499-b0a9-ca80bbb97cf2	2	learn	f	2026-09-15 07:02:01.626519+00	2026-09-17 09:53:25.251+00
01a0a3df-649e-7009-81b0-9477e87f1572	01a0a3df-648d-7499-b0a9-ca80bbb97cf2	3	to learned	f	2026-09-15 07:02:01.63106+00	2026-09-17 09:53:25.263+00
01a0a3df-64a7-7592-8095-1631cc16f79a	01a0a3df-64a3-73ed-8fe2-cb5763cd7f59	0	to leave	t	2026-09-15 07:02:01.640089+00	2026-09-17 09:53:25.286+00
01a0a3df-640e-72ad-b2db-f40216f8f8ab	01a0a3df-6404-7244-a476-5062ecc1cf05	1	False	f	2026-09-15 07:02:01.486745+00	2026-09-15 07:02:06.289+00
01a0a3df-64b6-70f6-acf9-2f8fb1cc5b24	01a0a3df-64b1-71c9-88ea-90285c66231e	0	studying	t	2026-09-15 07:02:01.655059+00	2026-09-17 09:53:25.3+00
01a0a3df-6426-71d5-b5fd-57ac77e486c4	01a0a3df-641c-7277-b7be-e40c21814b27	1	I deleted the email who was spam.	f	2026-09-15 07:02:01.51064+00	2026-09-15 07:02:06.32+00
01a0a3df-642b-7496-b331-53ad0d57446f	01a0a3df-641c-7277-b7be-e40c21814b27	2	I deleted the email where was spam.	f	2026-09-15 07:02:01.515713+00	2026-09-15 07:02:06.33+00
01a0a3df-642f-72f6-97c7-ee0d4072b891	01a0a3df-641c-7277-b7be-e40c21814b27	3	I deleted the email whose was spam.	f	2026-09-15 07:02:01.520559+00	2026-09-15 07:02:06.337+00
01a0a3df-6473-70f6-94ef-ace136d9c216	01a0a3df-646c-70be-86fd-34c67e7e55ca	0	could	t	2026-09-15 07:02:01.587981+00	2026-09-17 09:53:25.628+00
01a0a3df-656d-7427-abbd-e90f4d6e76ae	01a0a3df-6566-702d-9ded-b1e5bef8c087	0	at	t	2026-09-15 07:02:01.838449+00	2026-09-17 09:53:23.177+00
01a0a3df-6574-765e-a272-7280078bf1af	01a0a3df-6566-702d-9ded-b1e5bef8c087	1	in	f	2026-09-15 07:02:01.845702+00	2026-09-17 09:53:23.189+00
01a0a3df-657b-767a-a4a3-907c3a23c549	01a0a3df-6566-702d-9ded-b1e5bef8c087	2	on	f	2026-09-15 07:02:01.852575+00	2026-09-17 09:53:23.202+00
01a0a3df-645e-74a5-b6ad-f95b8d272152	01a0a3df-6455-75b7-be32-c2a685604009	1	False	t	2026-09-15 07:02:01.567304+00	2026-09-15 07:02:06.403+00
01a0a3df-6582-759f-81f0-7f1414dd3a67	01a0a3df-6566-702d-9ded-b1e5bef8c087	3	to	f	2026-09-15 07:02:01.859317+00	2026-09-17 09:53:23.215+00
01a0a3df-6591-73ef-8053-f798a4ac7da1	01a0a3df-6589-756d-acae-f25fe12a2900	0	on	t	2026-09-15 07:02:01.874877+00	2026-09-17 09:53:23.254+00
01a0a3df-6477-7494-b25a-c9c80ae5198c	01a0a3df-646c-70be-86fd-34c67e7e55ca	1	Tom said he will email me tomorrow.	f	2026-09-15 07:02:01.592024+00	2026-09-15 07:02:06.434+00
01a0a3df-647b-74db-912c-f34c967e25e2	01a0a3df-646c-70be-86fd-34c67e7e55ca	2	Tom told he would email me tomorrow.	f	2026-09-15 07:02:01.596263+00	2026-09-15 07:02:06.44+00
01a0a3df-6480-73a4-97b2-e3e0704afe33	01a0a3df-646c-70be-86fd-34c67e7e55ca	3	Tom said he would email you tomorrow.	f	2026-09-15 07:02:01.600634+00	2026-09-15 07:02:06.445+00
01a0a3df-64bf-704a-a722-87f4cba85a84	01a0a3df-64bb-7434-9fb4-490fc510a0e7	0	to see	t	2026-09-15 07:02:01.664281+00	2026-09-17 09:53:25.349+00
01a0a3df-6443-7210-9a50-20362849dee4	01a0a3df-643e-7668-8b94-b9517154107c	0	was	t	2026-09-15 07:02:01.53993+00	2026-09-17 09:53:25.496+00
01a0a3df-6448-7609-820b-490a6372743c	01a0a3df-643e-7668-8b94-b9517154107c	1	is being	f	2026-09-15 07:02:01.544583+00	2026-09-17 09:53:25.507+00
01a0a3df-644c-7025-852e-136d8fa773c8	01a0a3df-643e-7668-8b94-b9517154107c	2	were	f	2026-09-15 07:02:01.549069+00	2026-09-17 09:53:25.527+00
01a0a3df-6451-7632-8eff-4f8a5c7017cb	01a0a3df-643e-7668-8b94-b9517154107c	3	has	f	2026-09-15 07:02:01.553656+00	2026-09-17 09:53:25.539+00
01a0a3df-64ac-718a-a6f4-4d56f5933309	01a0a3df-64a3-73ed-8fe2-cb5763cd7f59	1	False	f	2026-09-15 07:02:01.645374+00	2026-09-15 07:02:06.505+00
01a0a3df-645a-70c2-b876-3980b25ab157	01a0a3df-6455-75b7-be32-c2a685604009	0	would	t	2026-09-15 07:02:01.562935+00	2026-09-17 09:53:25.556+00
01a0a3df-6467-75b1-9062-9c6d53832371	01a0a3df-6463-77cc-8899-5fd0df9ede61	0	She told me the news.	t	2026-09-15 07:02:01.576179+00	2026-09-17 09:53:25.576+00
01a0a3df-64c9-7050-86a0-5475bb7410be	01a0a3df-64bb-7434-9fb4-490fc510a0e7	2	Try avoiding to make the same mistake.	f	2026-09-15 07:02:01.674597+00	2026-09-15 07:02:06.54+00
01a0a3df-64cf-7768-91d5-f17e527850c4	01a0a3df-64bb-7434-9fb4-490fc510a0e7	3	Try avoid making the same mistake.	f	2026-09-15 07:02:01.680224+00	2026-09-15 07:02:06.545+00
01a0a3df-652e-763d-af23-cd484d6aa34d	01a0a3df-6521-73b7-ba8b-ece575afad6f	1	many	f	2026-09-15 07:02:01.775774+00	2026-09-17 09:53:23.79+00
01a0a3df-653c-7010-a9d0-583bd5d5353a	01a0a3df-6535-7435-849c-9e13fc945066	0	a few	t	2026-09-15 07:02:01.789895+00	2026-09-17 09:53:23.85+00
01a0a3df-63ef-76b6-88e6-47b473334a49	01a0a3df-63eb-72fd-999c-123f301ed0f2	0	who	t	2026-09-15 07:02:01.456182+00	2026-09-17 09:53:24.969+00
01a0a3df-63f6-7505-8466-4412e02f6907	01a0a3df-63eb-72fd-999c-123f301ed0f2	1	which	f	2026-09-15 07:02:01.462972+00	2026-09-17 09:53:24.98+00
01a0a3df-63fb-7453-b2f7-025faae2b8d5	01a0a3df-63eb-72fd-999c-123f301ed0f2	2	where	f	2026-09-15 07:02:01.468076+00	2026-09-17 09:53:24.991+00
01a0a3df-651a-737c-8864-009045f6fd74	01a0a3df-650c-71bd-bf96-dd1a7ecb72b4	1	False	f	2026-09-15 07:02:01.755626+00	2026-09-15 07:02:06.605+00
01a0a3df-6400-73f7-8de0-656a015bf66e	01a0a3df-63eb-72fd-999c-123f301ed0f2	3	what	f	2026-09-15 07:02:01.472695+00	2026-09-17 09:53:25.001+00
01a0a3df-6409-745f-83fe-4e428d875f6c	01a0a3df-6404-7244-a476-5062ecc1cf05	0	that	t	2026-09-15 07:02:01.482324+00	2026-09-17 09:53:25.018+00
01a0a3df-6417-7550-ac8a-791ca20f38a2	01a0a3df-6412-71e4-92c5-496c57e35642	0	where	t	2026-09-15 07:02:01.495736+00	2026-09-17 09:53:25.04+00
01a0a3df-6544-77e1-a77c-bb9bedfa6aa4	01a0a3df-6535-7435-849c-9e13fc945066	1	She receives much emails every day.	f	2026-09-15 07:02:01.797228+00	2026-09-15 07:02:06.638+00
01a0a3df-654a-70f9-a6c4-bbfc9009e022	01a0a3df-6535-7435-849c-9e13fc945066	2	She receives little emails every day.	f	2026-09-15 07:02:01.804007+00	2026-09-15 07:02:06.643+00
01a0a3df-6551-769f-be34-6d9d3edd0077	01a0a3df-6535-7435-849c-9e13fc945066	3	She receives a little emails every day.	f	2026-09-15 07:02:01.810526+00	2026-09-15 07:02:06.649+00
01a0a3df-65b9-7137-8f16-b568af6a9ded	01a0a3df-65af-76b4-aac1-191f2011729b	0	on	t	2026-09-15 07:02:01.915238+00	2026-09-17 09:53:23.374+00
01a0a3df-64f0-7760-a4a2-c67bc936cc5a	01a0a3df-64e9-72f5-bdef-460a127e08aa	0	much	t	2026-09-15 07:02:01.713623+00	2026-09-17 09:53:23.658+00
01a0a3df-64f7-73b5-b548-edf375571a07	01a0a3df-64e9-72f5-bdef-460a127e08aa	1	many	f	2026-09-15 07:02:01.720442+00	2026-09-17 09:53:23.683+00
01a0a3df-64fd-76b6-8f64-0a3a696019a7	01a0a3df-64e9-72f5-bdef-460a127e08aa	2	few	f	2026-09-15 07:02:01.726536+00	2026-09-17 09:53:23.703+00
01a0a3df-6504-7247-9ae1-4967047e0f1e	01a0a3df-64e9-72f5-bdef-460a127e08aa	3	a few	f	2026-09-15 07:02:01.733636+00	2026-09-17 09:53:23.716+00
01a0a3df-6599-7564-8318-3a305be7bdf5	01a0a3df-6589-756d-acae-f25fe12a2900	1	False	f	2026-09-15 07:02:01.882927+00	2026-09-15 07:02:06.705+00
01a0a3df-6513-72fe-99a9-e03db8f3ef79	01a0a3df-650c-71bd-bf96-dd1a7ecb72b4	0	a few	t	2026-09-15 07:02:01.748592+00	2026-09-17 09:53:23.744+00
01a0a3df-6528-7737-800d-c670efa4e914	01a0a3df-6521-73b7-ba8b-ece575afad6f	0	much	t	2026-09-15 07:02:01.769351+00	2026-09-17 09:53:23.777+00
01a0a3df-65c1-7500-85c3-bd8b531d0be1	01a0a3df-65af-76b4-aac1-191f2011729b	1	The train leaves on 6:30.	f	2026-09-15 07:02:01.922424+00	2026-09-15 07:02:06.731+00
01a0a3df-65c8-7134-a5ca-9c01595b6339	01a0a3df-65af-76b4-aac1-191f2011729b	2	The train leaves in 6:30.	f	2026-09-15 07:02:01.929692+00	2026-09-15 07:02:06.737+00
01a0a3df-65a8-704a-abd1-dc2918ccb25f	01a0a3df-65a1-7602-a8f7-1456761dfab8	0	in	t	2026-09-15 07:02:01.897479+00	2026-09-17 09:53:23.29+00
01a0a3df-6330-74f8-a13c-a35ba7847c7a	01a0a3df-631d-70ec-8add-2a648d7b134d	3	You were waiting for the bus?	f	2026-09-15 07:02:01.264905+00	2026-09-15 07:02:06.01+00
01a0a3df-636c-73c7-859f-616b3b862c9f	01a0a3df-6363-7613-9541-6778fc5eefd4	1	had not met	t	2026-09-15 07:02:01.325474+00	2026-09-15 07:02:06.093+00
01a0a3df-64c4-739d-83ac-9c29d6d6f28c	01a0a3df-64bb-7434-9fb4-490fc510a0e7	1	Try to avoid to make the same mistake.	f	2026-09-15 07:02:01.66936+00	2026-09-15 07:02:06.533+00
01a0a3df-65cf-70b8-bac2-659a77dce913	01a0a3df-65af-76b4-aac1-191f2011729b	3	The train leaves to 6:30.	f	2026-09-15 07:02:01.936505+00	2026-09-15 07:02:06.742+00
01a0a3df-65ec-72d2-95e2-e122417ff306	01a0a3df-65e4-72db-a696-337e2334d43b	0	could	t	2026-09-15 07:02:01.965088+00	2026-09-15 07:02:06.766+00
01a0a3df-65f2-7301-b4c0-7a702201d58d	01a0a3df-65e4-72db-a696-337e2334d43b	1	can	f	2026-09-15 07:02:01.971056+00	2026-09-15 07:02:06.771+00
01a0a3df-65f8-71ba-bc7c-c208c0bf5d50	01a0a3df-65e4-72db-a696-337e2334d43b	2	will	f	2026-09-15 07:02:01.977031+00	2026-09-15 07:02:06.777+00
01a0a3df-65fe-77ce-8c92-e59cda0e1327	01a0a3df-65e4-72db-a696-337e2334d43b	3	had can	f	2026-09-15 07:02:01.983623+00	2026-09-15 07:02:06.782+00
01a0a3df-660c-7347-b903-8bf9cbfe0247	01a0a3df-6605-73a5-8969-a5203adf17da	0	True	t	2026-09-15 07:02:01.997253+00	2026-09-15 07:02:06.793+00
01a0a3df-6613-70f0-aa59-68ec101ff637	01a0a3df-6605-73a5-8969-a5203adf17da	1	False	f	2026-09-15 07:02:02.004177+00	2026-09-15 07:02:06.799+00
01a0a3df-6620-7235-b805-82e4882498a4	01a0a3df-6619-728d-8543-36bbb606d7b2	0	had told	t	2026-09-15 07:02:02.018084+00	2026-09-15 07:02:06.811+00
01a0a3df-6630-7511-8754-46e92aba6fdc	01a0a3df-6627-7307-8158-11fc988ce0d3	0	I wish you would stop interrupting me.	t	2026-09-15 07:02:02.033407+00	2026-09-15 07:02:06.823+00
01a0a3df-6636-70df-bf1a-cfe6a6599728	01a0a3df-6627-7307-8158-11fc988ce0d3	1	I wish you stop interrupting me.	f	2026-09-15 07:02:02.039916+00	2026-09-15 07:02:06.828+00
01a0a3df-663d-7694-8133-4d42f3103012	01a0a3df-6627-7307-8158-11fc988ce0d3	2	I wish you stopped will interrupt me.	f	2026-09-15 07:02:02.046366+00	2026-09-15 07:02:06.833+00
01a0a3df-6643-77ab-82a1-cf4c036830f2	01a0a3df-6627-7307-8158-11fc988ce0d3	3	I wish you had stop interrupting me.	f	2026-09-15 07:02:02.05297+00	2026-09-15 07:02:06.839+00
01a0a3df-665f-7567-9800-20f7d4e040f5	01a0a3df-6658-730a-81fa-1762a74914b7	0	aren't you	t	2026-09-15 07:02:02.080666+00	2026-09-15 07:02:06.862+00
01a0a3df-6666-7695-b3dd-69db6ad2ade3	01a0a3df-6658-730a-81fa-1762a74914b7	1	are you	f	2026-09-15 07:02:02.087416+00	2026-09-15 07:02:06.866+00
01a0a3df-666c-7423-9ae1-12cbfd89bd2a	01a0a3df-6658-730a-81fa-1762a74914b7	2	don't you	f	2026-09-15 07:02:02.093142+00	2026-09-15 07:02:06.871+00
01a0a3df-6672-760b-91e2-3dd3ba286529	01a0a3df-6658-730a-81fa-1762a74914b7	3	isn't you	f	2026-09-15 07:02:02.099995+00	2026-09-15 07:02:06.876+00
01a0a3df-6680-770b-9af6-94a5e05a9b52	01a0a3df-6679-7378-b207-b9482fa6c1fa	0	True	t	2026-09-15 07:02:02.113787+00	2026-09-15 07:02:06.888+00
01a0a3df-6687-7130-87b6-bf63dad7109e	01a0a3df-6679-7378-b207-b9482fa6c1fa	1	False	f	2026-09-15 07:02:02.120377+00	2026-09-15 07:02:06.893+00
01a0a3df-6695-7032-9f1f-d313f54262fb	01a0a3df-668d-7042-8ac6-b039dc9a70c3	0	didn't	t	2026-09-15 07:02:02.134304+00	2026-09-15 07:02:06.903+00
01a0a3df-66a2-72e3-80ff-0679c60ad8fc	01a0a3df-669b-71a0-925c-f37220afcebc	0	shall we	t	2026-09-15 07:02:02.147787+00	2026-09-15 07:02:06.914+00
01a0a3df-66a9-7689-87eb-833b5aed8891	01a0a3df-669b-71a0-925c-f37220afcebc	1	will we	f	2026-09-15 07:02:02.154585+00	2026-09-15 07:02:06.919+00
01a0a3df-66b0-7056-8d15-b98395cac556	01a0a3df-669b-71a0-925c-f37220afcebc	2	don't we	f	2026-09-15 07:02:02.161142+00	2026-09-15 07:02:06.924+00
01a0a3df-66b6-76bd-b7e3-67171b5511d7	01a0a3df-669b-71a0-925c-f37220afcebc	3	aren't we	f	2026-09-15 07:02:02.167686+00	2026-09-15 07:02:06.929+00
01a0a913-8067-745c-8fcc-7848d7f25bae	01a0a913-805b-730a-b673-05a1e9597477	0	are going to	t	2026-09-16 07:17:02.696876+00	2026-09-17 09:53:22.136+00
01a0a913-8073-7543-bf94-5b19b458268a	01a0a913-805b-730a-b673-05a1e9597477	1	will suddenly	f	2026-09-16 07:17:02.708534+00	2026-09-17 09:53:22.148+00
01a0a479-1b62-7368-9be8-c8ffd7ef6f5c	01a0a2d1-22cb-74da-b223-103b664ee256	1	False	t	2026-09-15 09:49:55.427112+00	2026-09-17 09:53:19.687+00
01a0a478-3887-7133-adfa-3b5f454469c6	01a0a2d1-206c-7450-8183-a92aea970510	1	False	t	2026-09-15 09:48:57.3517+00	2026-09-17 09:53:20.483+00
01a0a913-7d7b-7262-a520-e8b26d84e4b6	01a0a2d1-2324-71d6-8ebd-18d939dc9174	2	An	f	2026-09-16 07:17:01.948461+00	2026-09-17 09:53:21.022+00
01a0a913-7d89-71e3-86e7-bf7e4733ea2a	01a0a2d1-2324-71d6-8ebd-18d939dc9174	3	No article	f	2026-09-16 07:17:01.962028+00	2026-09-17 09:53:21.034+00
01a0a913-8078-745e-8d01-5b8f73594819	01a0a913-805b-730a-b673-05a1e9597477	2	were	f	2026-09-16 07:17:02.713289+00	2026-09-17 09:53:22.16+00
01a0a913-8084-7139-b45f-bbcf4a64d9be	01a0a913-805b-730a-b673-05a1e9597477	3	have	f	2026-09-16 07:17:02.725394+00	2026-09-17 09:53:22.173+00
01a0a913-809c-7582-86c3-affdbd1962a1	01a0a913-8090-7431-a93d-f5efb36aabe7	0	will help	t	2026-09-16 07:17:02.748935+00	2026-09-17 09:53:22.198+00
01a0a913-812b-70ab-8db8-7a59b404689b	01a0a913-811f-734f-a5b8-45137ca6b595	0	could	t	2026-09-16 07:17:02.892698+00	2026-09-17 09:53:22.405+00
01a0a913-8137-77eb-bbe5-33f34622ec65	01a0a913-811f-734f-a5b8-45137ca6b595	1	can	f	2026-09-16 07:17:02.904842+00	2026-09-17 09:53:22.418+00
01a0a913-813d-7365-ac07-37b48b9b43a8	01a0a913-811f-734f-a5b8-45137ca6b595	2	could to	f	2026-09-16 07:17:02.916364+00	2026-09-17 09:53:22.43+00
01a0a913-7e7c-7593-b3c5-7ee321ecc41e	01a0a2d1-200f-7223-994c-61806492bccc	1	I work every Monday.	f	2026-09-16 07:17:02.205781+00	2026-09-17 09:53:21.414+00
01a0a913-7e86-76ef-8aa7-4d10bf046969	01a0a2d1-200f-7223-994c-61806492bccc	2	Water boils at 100°C.	f	2026-09-16 07:17:02.214818+00	2026-09-17 09:53:21.426+00
01a0a913-7e8a-74a6-88a7-b27c350b0a2c	01a0a2d1-200f-7223-994c-61806492bccc	3	She knows the answer.	f	2026-09-16 07:17:02.219417+00	2026-09-17 09:53:21.438+00
01a0a913-7f6e-7119-96c9-0ca059a872d9	01a0a3df-630f-72af-8a6b-cc72fee0b8d6	2	is sleeping	f	2026-09-16 07:17:02.447042+00	2026-09-17 09:53:21.805+00
01a0a913-7f79-77d7-8ebb-bf96a9892469	01a0a3df-630f-72af-8a6b-cc72fee0b8d6	3	were sleeping	f	2026-09-16 07:17:02.458607+00	2026-09-17 09:53:21.818+00
01a0a913-801e-71f6-b828-964dd9a86f0b	01a0a913-8012-73e4-b168-202b67e2d8e5	0	will	t	2026-09-16 07:17:02.623053+00	2026-09-17 09:53:22.043+00
01a0a913-8023-7494-893f-8fa86a3292ec	01a0a913-8012-73e4-b168-202b67e2d8e5	1	am going	f	2026-09-16 07:17:02.627855+00	2026-09-17 09:53:22.063+00
01a0a913-802e-709d-8ac4-c99699eabe94	01a0a913-8012-73e4-b168-202b67e2d8e5	2	was going to	f	2026-09-16 07:17:02.639548+00	2026-09-17 09:53:22.075+00
01a0a913-803a-7564-a295-60945295ef1c	01a0a913-8012-73e4-b168-202b67e2d8e5	3	do	f	2026-09-16 07:17:02.650917+00	2026-09-17 09:53:22.087+00
01a0a913-804f-77a1-a64a-27a3d262e356	01a0a913-8043-7368-90ef-87740c5f1401	0	is going to rain	t	2026-09-16 07:17:02.67278+00	2026-09-17 09:53:22.112+00
01a0a913-8148-72d2-b5bf-6a991f7ec5aa	01a0a913-811f-734f-a5b8-45137ca6b595	3	cans	f	2026-09-16 07:17:02.921243+00	2026-09-17 09:53:22.443+00
01a0a913-815c-778a-a386-7710275f2839	01a0a913-8153-7754-8ec1-f117e9b3b14a	0	Could	t	2026-09-16 07:17:02.941705+00	2026-09-17 09:53:22.483+00
01a0a913-816d-73cb-8c61-5415ea8e0852	01a0a913-8168-7348-b07b-4de65834997e	0	She can speak French.	t	2026-09-16 07:17:02.958475+00	2026-09-17 09:53:22.516+00
01a0a913-8179-7096-bc59-f43cdb425454	01a0a913-8168-7348-b07b-4de65834997e	1	She can speaks French.	f	2026-09-16 07:17:02.969785+00	2026-09-17 09:53:22.528+00
01a0a913-8181-724d-823e-3f92a0b9ae0d	01a0a913-8168-7348-b07b-4de65834997e	2	She can to speak French.	f	2026-09-16 07:17:02.978314+00	2026-09-17 09:53:22.541+00
01a0a913-8186-72b7-8b16-11d38385889d	01a0a913-8168-7348-b07b-4de65834997e	3	She cans speak French.	f	2026-09-16 07:17:02.989217+00	2026-09-17 09:53:22.552+00
01a0a3df-6420-7520-8926-3666b13bd3af	01a0a3df-641c-7277-b7be-e40c21814b27	0	who	t	2026-09-15 07:02:01.505422+00	2026-09-17 09:53:25.099+00
01a0a913-8ac1-753f-aa77-b0057dceeac8	01a0a3df-6463-77cc-8899-5fd0df9ede61	3	She said me that news.	f	2026-09-16 07:17:05.352425+00	2026-09-17 09:53:25.606+00
01a0a2d1-1e6f-7548-bb0f-e44d936b5fc4	01a0a2d1-1e69-7128-98b1-65d11152081c	0	have a different opinion	t	2026-09-15 02:06:48.944612+00	2026-09-17 09:53:18.856+00
01a0a913-819a-77a4-a7c6-8b95f240f633	01a0a913-8191-7768-be29-4104443397f9	0	cannot	t	2026-09-16 07:17:03.0033+00	2026-09-17 09:53:22.578+00
01a0a913-822d-7046-ab23-00ef978f043e	01a0a913-8220-7218-b562-a26bc0d675a7	0	faster	t	2026-09-16 07:17:03.149954+00	2026-09-17 09:53:22.773+00
01a0a913-8232-76cd-97c9-b0ee512a6ac7	01a0a913-8220-7218-b562-a26bc0d675a7	1	more fast	f	2026-09-16 07:17:03.160873+00	2026-09-17 09:53:22.786+00
01a0a913-823d-7046-883f-33cb5e431335	01a0a913-8220-7218-b562-a26bc0d675a7	2	fastest	f	2026-09-16 07:17:03.165937+00	2026-09-17 09:53:22.797+00
01a0a913-8248-7595-bb05-ddd8ac43d571	01a0a913-8220-7218-b562-a26bc0d675a7	3	the faster	f	2026-09-16 07:17:03.177244+00	2026-09-17 09:53:22.809+00
01a0a913-825d-7776-97fa-2f894be1db1d	01a0a913-8252-72d3-8774-15571ee26678	0	the most interesting	t	2026-09-16 07:17:03.198833+00	2026-09-17 09:53:22.834+00
01a0a913-826f-73cd-a207-1f0ec023ec9b	01a0a913-8269-7201-b908-54bfdd3a8e61	0	worse than	t	2026-09-16 07:17:03.222395+00	2026-09-17 09:53:22.859+00
01a0a913-827b-720c-80eb-9b166a160887	01a0a913-8269-7201-b908-54bfdd3a8e61	1	badder than	f	2026-09-16 07:17:03.23402+00	2026-09-17 09:53:22.87+00
01a0a913-8287-7386-93f1-cceff3403689	01a0a913-8269-7201-b908-54bfdd3a8e61	2	the worst	f	2026-09-16 07:17:03.246923+00	2026-09-17 09:53:22.883+00
01a0a913-8293-71bd-bb1c-9d2995316fc9	01a0a913-8269-7201-b908-54bfdd3a8e61	3	more worse than	f	2026-09-16 07:17:03.251991+00	2026-09-17 09:53:22.895+00
01a0a913-82a7-712b-9659-06e789315010	01a0a913-829e-75f9-b0f6-fa6a21d24689	0	smaller	t	2026-09-16 07:17:03.271929+00	2026-09-17 09:53:22.924+00
01a0a913-8387-7760-b7e6-a46f678021cc	01a0a3df-65a1-7602-a8f7-1456761dfab8	1	on	f	2026-09-16 07:17:03.496113+00	2026-09-17 09:53:23.304+00
01a0a913-8390-709d-922c-8c21700c2ecf	01a0a3df-65a1-7602-a8f7-1456761dfab8	2	at	f	2026-09-16 07:17:03.505477+00	2026-09-17 09:53:23.328+00
01a0a913-839c-77e3-9479-29c15a437620	01a0a3df-65a1-7602-a8f7-1456761dfab8	3	from	f	2026-09-16 07:17:03.517398+00	2026-09-17 09:53:23.348+00
01a0a913-8494-77c7-92c9-d27704cf4ce7	01a0a3df-6521-73b7-ba8b-ece575afad6f	2	a few	f	2026-09-16 07:17:03.765734+00	2026-09-17 09:53:23.804+00
01a0a913-854d-7271-ada9-e4efc780a516	01a0a913-8535-730a-b306-f6106f080bc5	2	would get	f	2026-09-16 07:17:03.949824+00	2026-09-17 09:53:24.095+00
01a0a913-8558-71ae-9b81-86a177f1335e	01a0a913-8535-730a-b306-f6106f080bc5	3	are getting	f	2026-09-16 07:17:03.960702+00	2026-09-17 09:53:24.107+00
01a0a913-8566-73a9-9f13-fece0b2d499a	01a0a913-8561-75f5-886b-476a51684e60	0	finishes	t	2026-09-16 07:17:03.981782+00	2026-09-17 09:53:24.135+00
01a0a913-8589-7537-8cf9-90c19840ddca	01a0a913-8572-73cc-a3a9-739d4e52f17a	0	will take	t	2026-09-16 07:17:04.011107+00	2026-09-17 09:53:24.168+00
01a0a913-8596-7038-a57b-bafaafc8aec2	01a0a913-8572-73cc-a3a9-739d4e52f17a	1	take always	f	2026-09-16 07:17:04.029876+00	2026-09-17 09:53:24.181+00
01a0a913-85a3-72d0-8795-df1585997c96	01a0a913-8572-73cc-a3a9-739d4e52f17a	2	will took	f	2026-09-16 07:17:04.044124+00	2026-09-17 09:53:24.193+00
01a0a913-85b7-7536-9307-556b1f1a848a	01a0a913-8572-73cc-a3a9-739d4e52f17a	3	would took	f	2026-09-16 07:17:04.056101+00	2026-09-17 09:53:24.205+00
01a0a913-85cf-758b-8504-751c8c4c9475	01a0a913-85c3-72f9-b263-d713dca22eea	0	don't get	t	2026-09-16 07:17:04.081104+00	2026-09-17 09:53:24.23+00
01a0a913-8680-725c-9017-ca6a5494f034	01a0a913-867a-75df-a19e-b6a1ab59d126	0	has been studying	t	2026-09-16 07:17:04.26418+00	2026-09-17 09:53:24.406+00
01a0a913-868c-767f-b28e-6f62a848a8c5	01a0a913-867a-75df-a19e-b6a1ab59d126	1	has studied yesterday	f	2026-09-16 07:17:04.275467+00	2026-09-17 09:53:24.425+00
01a0a913-8698-749b-a471-9ca0841ebec0	01a0a913-867a-75df-a19e-b6a1ab59d126	2	is study	f	2026-09-16 07:17:04.280878+00	2026-09-17 09:53:24.437+00
01a0a913-86ac-7473-ac23-6eb66071d2c7	01a0a913-867a-75df-a19e-b6a1ab59d126	3	have been studying	f	2026-09-16 07:17:04.302111+00	2026-09-17 09:53:24.45+00
01a0a913-86c7-7580-b381-26c3c933a0fc	01a0a913-86b8-702f-a929-9d6ad00ca29b	0	have been working	t	2026-09-16 07:17:04.328258+00	2026-09-17 09:53:24.475+00
01a0a913-86d5-73de-82c4-8151bdced310	01a0a913-86d0-7622-b3ad-a65a0d194d6d	0	have been walking	t	2026-09-16 07:17:04.348703+00	2026-09-17 09:53:24.499+00
01a0a913-86e0-72a3-bfed-030f902f0981	01a0a913-86d0-7622-b3ad-a65a0d194d6d	1	walked tomorrow	f	2026-09-16 07:17:04.353505+00	2026-09-17 09:53:24.511+00
01a0a913-86e9-7036-897c-47146b90b066	01a0a913-86d0-7622-b3ad-a65a0d194d6d	2	have walk	f	2026-09-16 07:17:04.361789+00	2026-09-17 09:53:24.523+00
01a0a913-86ed-76c0-8aa4-60d93ef8a764	01a0a913-86d0-7622-b3ad-a65a0d194d6d	3	am walked	f	2026-09-16 07:17:04.366519+00	2026-09-17 09:53:24.536+00
01a0a913-8701-7361-a8c2-89f066c84cc2	01a0a913-86f8-77f0-b33e-4db909f074fe	0	has he been learning	t	2026-09-16 07:17:04.386025+00	2026-09-17 09:53:24.56+00
01a0a913-877f-74c5-a9f2-e89ec88a90c2	01a0a913-8774-744f-94f9-3f9e76c8e20e	0	is grown	t	2026-09-16 07:17:04.511558+00	2026-09-17 09:53:24.7+00
01a0a913-8788-76c4-a7ff-410dfee322ab	01a0a913-8774-744f-94f9-3f9e76c8e20e	1	grows by	f	2026-09-16 07:17:04.520758+00	2026-09-17 09:53:24.712+00
01a0a913-878d-7073-a1ea-20c2dfa98809	01a0a913-8774-744f-94f9-3f9e76c8e20e	2	was grow	f	2026-09-16 07:17:04.532382+00	2026-09-17 09:53:24.723+00
01a0a913-8798-764b-af18-4032bb6add33	01a0a913-8774-744f-94f9-3f9e76c8e20e	3	is growing by	f	2026-09-16 07:17:04.536964+00	2026-09-17 09:53:24.735+00
01a0a913-87a5-7425-8ecc-2e92434f4301	01a0a913-87a0-7386-b510-882eb5e8c36f	0	were sent	t	2026-09-16 07:17:04.549737+00	2026-09-17 09:53:24.756+00
01a0a913-87b9-70f8-af25-9ff541ef2cc4	01a0a913-87b0-737d-aa4b-d11dfa9cef95	0	The window was broken last night.	t	2026-09-16 07:17:04.569783+00	2026-09-17 09:53:24.781+00
01a0a913-87bd-773f-94ca-0ceb360fe277	01a0a913-87b0-737d-aa4b-d11dfa9cef95	1	Someone broke the window.	f	2026-09-16 07:17:04.574214+00	2026-09-17 09:53:24.793+00
01a0a913-87c8-72dc-9b8f-c68d961d592c	01a0a913-87b0-737d-aa4b-d11dfa9cef95	2	The window broke someone.	f	2026-09-16 07:17:04.585297+00	2026-09-17 09:53:24.798+00
01a0a913-87d1-77ed-b39c-1fc3e80e10d7	01a0a913-87b0-737d-aa4b-d11dfa9cef95	3	Someone was breaking.	f	2026-09-16 07:17:04.594469+00	2026-09-17 09:53:24.81+00
01a0a913-87e2-77d3-a7aa-71ab38ec6715	01a0a913-87d6-75ad-9030-c7e5d7215ab4	0	is cleaned	t	2026-09-16 07:17:04.611448+00	2026-09-17 09:53:24.833+00
01a0a913-88b1-7041-a370-50418fa2a206	01a0a3df-6412-71e4-92c5-496c57e35642	1	who	f	2026-09-16 07:17:04.818233+00	2026-09-17 09:53:25.05+00
01a0a913-88be-7209-9338-5bc6ecc75cff	01a0a3df-6412-71e4-92c5-496c57e35642	2	whose	f	2026-09-16 07:17:04.831315+00	2026-09-17 09:53:25.062+00
01a0a913-88c9-7576-901e-98b52b7483ea	01a0a3df-6412-71e4-92c5-496c57e35642	3	which person	f	2026-09-16 07:17:04.841945+00	2026-09-17 09:53:25.067+00
01a0a913-89bf-7327-ad7f-0eeb239582ff	01a0a3df-64b1-71c9-88ea-90285c66231e	1	to study	f	2026-09-16 07:17:05.088764+00	2026-09-17 09:53:25.311+00
01a0a913-89cc-70ff-bd08-8b3cf838979a	01a0a3df-64b1-71c9-88ea-90285c66231e	2	study	f	2026-09-16 07:17:05.100924+00	2026-09-17 09:53:25.322+00
01a0a913-89d8-7296-85a7-56cbb65edbdd	01a0a3df-64b1-71c9-88ea-90285c66231e	3	studied	f	2026-09-16 07:17:05.112741+00	2026-09-17 09:53:25.331+00
01a0a913-8ab3-7594-a3c3-c2ea2ae41957	01a0a3df-6463-77cc-8899-5fd0df9ede61	1	She said me the news.	f	2026-09-16 07:17:05.332407+00	2026-09-17 09:53:25.582+00
01a0a913-84a0-7197-9b67-7207df957699	01a0a3df-6521-73b7-ba8b-ece575afad6f	3	few	f	2026-09-16 07:17:03.777615+00	2026-09-17 09:53:23.825+00
01a0a913-8540-7628-adda-c399e3929c1b	01a0a913-8535-730a-b306-f6106f080bc5	0	get	t	2026-09-16 07:17:03.937187+00	2026-09-17 09:53:24.062+00
01a0a913-8548-70ca-8022-751b5914e8ca	01a0a913-8535-730a-b306-f6106f080bc5	1	will got	f	2026-09-16 07:17:03.945242+00	2026-09-17 09:53:24.075+00
01a0a913-8abc-750d-b568-c0cc7cc840b2	01a0a3df-6463-77cc-8899-5fd0df9ede61	2	She told the news me.	f	2026-09-16 07:17:05.341257+00	2026-09-17 09:53:25.601+00
\.


--
-- Data for Name: quiz_attempts; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz_attempts (id, user_id, quiz_id, score, total_questions, correct_count, time_spent_seconds, answers, started_at, completed_at, created_at, updated_at) FROM stdin;
01a0ae54-25ea-709f-a5cd-d0afb3376175	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	50	4	2	916	[{"type": "multiple_choice", "prompt": "Which word means \\"an idea that has not yet been proven, but can be tested\\"?", "isCorrect": true, "questionId": "01a0a2d1-1f16-70ac-ba15-09409253cb98", "explanation": "A \\"hypothesis\\" is a testable prediction made before research.", "userAnswerLabel": "hypothesis", "selectedAnswerIds": ["01a0a2d1-1f1c-7244-bb77-51279548d363"], "correctAnswerLabel": "hypothesis"}, {"type": "true_false", "prompt": "\\"Furthermore\\" is used to add another point to what you already said.", "isCorrect": true, "questionId": "01a0a2d1-1f33-771b-994e-794867afd540", "explanation": "\\"Furthermore\\" introduces an additional supporting point, similar to \\"in addition\\".", "userAnswerLabel": "True", "selectedAnswerIds": ["01a0a2d1-1f39-76aa-a2ac-85db89b4eb99"], "correctAnswerLabel": "True"}, {"type": "fill_blank", "prompt": "Researchers ______ the data to find patterns before writing their report.", "isCorrect": false, "questionId": "01a0a2d1-1f44-7736-9031-049881d5deb9", "textAnswer": "idk", "explanation": "\\"Analyze\\" means to examine something in detail.", "userAnswerLabel": "idk", "correctAnswerLabel": "analyze / analyzed"}, {"type": "multiple_choice", "prompt": "\\"The results significantly improved\\" means the improvement was...", "isCorrect": false, "questionId": "01a0a2d1-1f57-737a-b22d-157dd1a7dcbe", "explanation": "\\"Significant\\" means large or important enough to be noticeable.", "userAnswerLabel": "impossible to measure", "selectedAnswerIds": ["01a0a2d1-1f6e-71bd-80de-ab6a47563267"], "correctAnswerLabel": "large and noticeable"}]	2026-09-17 07:30:28.855+00	2026-09-17 07:45:45.451+00	2026-09-17 07:45:45.45694+00	2026-09-17 07:45:45.45694+00
\.


--
-- Data for Name: quiz_questions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quiz_questions (id, quiz_id, order_index, type, prompt, explanation, points, created_at, updated_at) FROM stdin;
01a0a2d1-1f44-7736-9031-049881d5deb9	01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	2	fill_blank	Researchers ______ the data to find patterns before writing their report.	"Analyze" means to examine something in detail.	1	2026-09-15 02:06:49.156927+00	2026-09-17 09:53:19.319+00
01a0a2d1-1f57-737a-b22d-157dd1a7dcbe	01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	3	multiple_choice	"The results significantly improved" means the improvement was...	"Significant" means large or important enough to be noticeable.	1	2026-09-15 02:06:49.176757+00	2026-09-17 09:53:19.361+00
01a0a2d1-1ffe-72d9-bff6-09e26bc6cc95	01a0a2d1-1fd8-7047-afb9-07f25f2cc588	1	fill_blank	We ______ (study) at the moment.	Use are with we and the -ing form.	1	2026-09-15 02:06:49.343227+00	2026-09-17 09:53:21.356+00
01a0a2d1-201a-738c-b47b-d65e8ea84a4d	01a0a2d1-1fd8-7047-afb9-07f25f2cc588	3	fill_blank	______ she ______ (cook) now?	Move is before the subject in a question.	1	2026-09-15 02:06:49.371575+00	2026-09-17 09:53:21.45+00
01a0a2d1-1e3c-73fa-938c-f40a2a52fe23	01a0a2d1-1dfa-7577-8521-f7ec48a4ed37	2	fill_blank	The person who owns the apartment you rent is called your ______.	A landlord is the owner who rents property to tenants.	1	2026-09-15 02:06:48.894197+00	2026-09-17 09:53:18.745+00
01a0a2d1-1e48-756e-8f47-7a7846117dc9	01a0a2d1-1dfa-7577-8521-f7ec48a4ed37	3	multiple_choice	"This soup is delicious" means the soup is...	"Delicious" describes food that tastes very good.	1	2026-09-15 02:06:48.905157+00	2026-09-17 09:53:18.769+00
01a0a2d1-1e69-7128-98b1-65d11152081c	01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a	0	multiple_choice	"I disagree with you" means you...	"Disagree" means you have a different opinion from someone else.	1	2026-09-15 02:06:48.938318+00	2026-09-17 09:53:18.842+00
01a0a2d1-1fb2-7092-9985-94bad432c6e1	01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	3	multiple_choice	Which question is correctly formed?	Questions use "Do/Does" + subject + base verb, without -s on the main verb.	1	2026-09-15 02:06:49.267797+00	2026-09-17 09:53:20.066+00
01a0a2d1-1e83-702d-a1c1-c57be2892e40	01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a	1	true_false	If you feel "relieved", you feel worried and stressed.	"Relieved" is the opposite — it means a worry has gone away and you feel better.	1	2026-09-15 02:06:48.964102+00	2026-09-17 09:53:18.903+00
01a0a2d1-20ae-7583-959e-82d89b7459e5	01a0a2d1-2091-71f5-814e-bcfba328283a	1	true_false	"I have finished my homework yesterday" is correct.	"Yesterday" marks a finished past time, so use Past Simple: "I finished my homework yesterday."	1	2026-09-15 02:06:49.519413+00	2026-09-17 09:53:20.715+00
01a0a2d1-20bf-70a2-bb44-864991896189	01a0a2d1-2091-71f5-814e-bcfba328283a	2	fill_blank	She ______ (live) here since 2020.	A situation that started in the past and continues: "has lived".	1	2026-09-15 02:06:49.535846+00	2026-09-17 09:53:20.752+00
01a0a2d1-1fdf-7675-888d-a6995c1bce02	01a0a2d1-1fd8-7047-afb9-07f25f2cc588	0	multiple_choice	Look! The baby ______.	An action happening now uses is + V-ing.	1	2026-09-15 02:06:49.312462+00	2026-09-17 09:53:21.267+00
01a0a2d1-200f-7223-994c-61806492bccc	01a0a2d1-1fd8-7047-afb9-07f25f2cc588	2	multiple_choice	Which sentence describes a temporary situation?	This month marks a limited period.	1	2026-09-15 02:06:49.360453+00	2026-09-17 09:53:21.389+00
01a0a2d1-215f-7683-a978-84a4c789ea8e	01a0a2d1-2158-74bc-b481-956f783c8f98	0	multiple_choice	You ______ drink more water.	"Should" is the usual modal for advice.	1	2026-09-15 02:06:49.697032+00	2026-09-17 09:53:19.712+00
01a0a2d1-2046-7228-9dbc-a0804540368c	01a0a2d1-2041-7599-9d22-ce690ceb7d4f	0	multiple_choice	They ______ to Da Nang last summer.	A finished action at a specific past time uses the past simple: "went".	1	2026-09-15 02:06:49.415657+00	2026-09-17 09:53:20.373+00
01a0a2d1-205f-7619-bbbb-76e438bf174e	01a0a2d1-2041-7599-9d22-ce690ceb7d4f	1	fill_blank	She ______ (not/finish) the report yesterday.	Past simple negative: "didn't" + base verb → "didn't finish".	1	2026-09-15 02:06:49.439974+00	2026-09-17 09:53:20.434+00
01a0a2d1-206c-7450-8183-a92aea970510	01a0a2d1-2041-7599-9d22-ce690ceb7d4f	2	true_false	"Did you went home early?" is correct.	After "did", use the base verb: "Did you go home early?"	1	2026-09-15 02:06:49.453002+00	2026-09-17 09:53:20.459+00
01a0a2d1-1e95-77bd-b6e1-397cabd3b53e	01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a	2	fill_blank	"Sorry to ______, but you have a phone call" — the missing word means to break into a conversation.	"Interrupt" means to break into someone's speech or activity.	1	2026-09-15 02:06:48.982352+00	2026-09-17 09:53:18.932+00
01a0a2d1-1f78-7330-b5c3-e6fc3fccaa86	01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	0	multiple_choice	She ______ to work by bus every morning.	Third-person singular (she) needs the -s ending: "goes".	1	2026-09-15 02:06:49.209499+00	2026-09-17 09:53:19.932+00
01a0a2d1-1f93-73a6-9c26-7c8d6cce0239	01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	1	true_false	"They plays football on Sundays" is correct.	"They" is plural, so the verb stays in base form: "They play football."	1	2026-09-15 02:06:49.236458+00	2026-09-17 09:53:19.996+00
01a0a2d1-1fa5-772e-b7d2-e6cf11103dfb	01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	2	fill_blank	He ______ (not/like) spicy food.	Negative present simple for he/she/it uses "doesn't" + base verb: "doesn't like".	1	2026-09-15 02:06:49.254166+00	2026-09-17 09:53:20.042+00
01a0a2d1-2075-700d-b418-a2ae66d41a0d	01a0a2d1-2041-7599-9d22-ce690ceb7d4f	3	multiple_choice	Which time expression usually goes with the Past Simple?	"Last week" refers to a finished, specific time in the past — perfect for the Past Simple.	1	2026-09-15 02:06:49.462171+00	2026-09-15 07:02:05.103+00
01a0a2d1-1e9f-72a7-a12e-ca50c466a13c	01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a	3	multiple_choice	Which adjective describes someone who is not sure of themselves before a big test?	"Nervous" describes worry or fear before something important.	1	2026-09-15 02:06:48.991943+00	2026-09-17 09:53:18.955+00
01a0a2d1-1ebf-72a8-a5da-52d7235a8f56	01a0a2d1-1eb9-7373-a4b2-1a45bf883e05	0	multiple_choice	You must show this document before boarding your flight.	A boarding pass is required to get on the plane.	1	2026-09-15 02:06:49.023937+00	2026-09-17 09:53:19.017+00
01a0a2d1-1eda-7403-af24-26b8c567d7d0	01a0a2d1-1eb9-7373-a4b2-1a45bf883e05	1	true_false	"Vacancy" at a hotel means all rooms are full.	"Vacancy" actually means an available room. "No vacancy" means fully booked.	1	2026-09-15 02:06:49.051349+00	2026-09-17 09:53:19.091+00
01a0a2d1-20ca-746a-86f4-725fdcae425d	01a0a2d1-2091-71f5-814e-bcfba328283a	3	multiple_choice	"Have you ever been to Korea?" is asking about...	This question asks about life experience up to now, without a specific time.	1	2026-09-15 02:06:49.547699+00	2026-09-15 07:02:05.215+00
01a0a2d1-20f2-778d-810c-7043eccb69e0	01a0a2d1-20ed-71c8-9e4d-33fbef6b7f28	0	multiple_choice	Look at those dark clouds! It ______ rain.	"Be going to" is used for predictions based on present evidence you can see now.	1	2026-09-15 02:06:49.58718+00	2026-09-15 07:02:05.267+00
01a0a2d1-2112-716f-b214-e606ef788252	01a0a2d1-20ed-71c8-9e4d-33fbef6b7f28	1	true_false	"I will go to the gym" and "I'm going to the gym" always mean the same thing.	"Will" often shows a decision made now; "be going to" shows a plan decided earlier. They can differ in meaning.	1	2026-09-15 02:06:49.619644+00	2026-09-15 07:02:05.302+00
01a0a2d1-2123-7664-9dc4-869d1357a0ff	01a0a2d1-20ed-71c8-9e4d-33fbef6b7f28	2	fill_blank	A: "The phone is ringing." B: "I ______ (get) it!"	A decision made at the moment of speaking uses "will": "I'll get it."	1	2026-09-15 02:06:49.636013+00	2026-09-15 07:02:05.325+00
01a0a2d1-2133-765e-b68f-266ade52acbe	01a0a2d1-20ed-71c8-9e4d-33fbef6b7f28	3	multiple_choice	Which sentence describes a fixed arrangement already in the calendar?	The Present Continuous is used for fixed future arrangements, like a booked flight.	1	2026-09-15 02:06:49.652551+00	2026-09-15 07:02:05.345+00
01a0a2d1-2096-747e-bf4b-c9c62cecf535	01a0a2d1-2091-71f5-814e-bcfba328283a	0	multiple_choice	I ______ never ______ to Japan.	Present perfect experience: "have" + past participle "been".	1	2026-09-15 02:06:49.495468+00	2026-09-17 09:53:20.654+00
01a0a2d1-1ee9-7083-b5ba-cb1d40b92824	01a0a2d1-1eb9-7373-a4b2-1a45bf883e05	2	fill_blank	You have to pass through ______ when entering a foreign country with your luggage.	"Customs" is the airport checkpoint that inspects goods entering a country.	1	2026-09-15 02:06:49.066184+00	2026-09-17 09:53:19.128+00
01a0a2d1-1ef3-7041-b1eb-8622e9e4635e	01a0a2d1-1eb9-7373-a4b2-1a45bf883e05	3	multiple_choice	A ticket that covers going and coming back is called a...	"Roundtrip" ticket covers both the outbound and return journey.	1	2026-09-15 02:06:49.076382+00	2026-09-17 09:53:19.153+00
01a0a2d1-1f16-70ac-ba15-09409253cb98	01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	0	multiple_choice	Which word means "an idea that has not yet been proven, but can be tested"?	A "hypothesis" is a testable prediction made before research.	1	2026-09-15 02:06:49.111479+00	2026-09-17 09:53:19.225+00
01a0a2d1-1f33-771b-994e-794867afd540	01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	1	true_false	"Furthermore" is used to add another point to what you already said.	"Furthermore" introduces an additional supporting point, similar to "in addition".	1	2026-09-15 02:06:49.140296+00	2026-09-17 09:53:19.283+00
01a0a2d1-21b1-750d-b584-e37d1b85b6ed	01a0a2d1-21ac-751f-89e5-7c3fc7cfea85	0	multiple_choice	If I ______ enough money, I would travel around the world.	Second conditional uses the past simple in the if-clause: "had".	1	2026-09-15 02:06:49.777938+00	2026-09-15 07:02:05.511+00
01a0a2d1-21c9-754c-ad04-66023c427991	01a0a2d1-21ac-751f-89e5-7c3fc7cfea85	1	true_false	"If it will rain, I will bring an umbrella" is correct.	The if-clause should use the present simple, not "will": "If it rains, I will bring an umbrella."	1	2026-09-15 02:06:49.801914+00	2026-09-15 07:02:05.542+00
01a0a2d1-21d7-7471-b938-a3462fad82f8	01a0a2d1-21ac-751f-89e5-7c3fc7cfea85	2	fill_blank	If you heat water to 100°C, it ______ (boil). [zero conditional]	Zero conditional describes general truths with present simple in both clauses: "boils".	1	2026-09-15 02:06:49.815732+00	2026-09-15 07:02:05.562+00
01a0a2d1-21e0-76e8-860d-b9e54db439c0	01a0a2d1-21ac-751f-89e5-7c3fc7cfea85	3	multiple_choice	"If I have free time this weekend, I will visit my grandparents" is which type of conditional?	This describes a real, likely future possibility — the first conditional.	1	2026-09-15 02:06:49.82497+00	2026-09-15 07:02:05.575+00
01a0a2d1-2227-7686-a90c-76bdde495138	01a0a2d1-2220-7113-a42c-e85af0c1cf7f	0	multiple_choice	This song ______ by a famous singer.	Passive form of the present simple: "is sung".	1	2026-09-15 02:06:49.896692+00	2026-09-15 07:02:05.626+00
01a0a2d1-224a-71f5-90af-aaa36c523617	01a0a2d1-2220-7113-a42c-e85af0c1cf7f	1	true_false	"The window was broke last night" is grammatically correct.	The passive needs the past participle "broken", not "broke": "The window was broken."	1	2026-09-15 02:06:49.931803+00	2026-09-15 07:02:05.651+00
01a0a2d1-225d-7000-9e7e-95fee84c268f	01a0a2d1-2220-7113-a42c-e85af0c1cf7f	2	fill_blank	The Eiffel Tower ______ (build) in 1889.	Passive past simple: "was built".	1	2026-09-15 02:06:49.950678+00	2026-09-15 07:02:05.663+00
01a0a2d1-226b-7062-a506-411987e3795c	01a0a2d1-2220-7113-a42c-e85af0c1cf7f	3	multiple_choice	Which sentence is a good use of the passive voice?	The passive fits well when the doer is unknown or unimportant — here, we don't know who broke the window.	1	2026-09-15 02:06:49.964816+00	2026-09-15 07:02:05.672+00
01a0a2d1-23af-7614-a219-c32aa0653e62	01a0a2d1-2378-71a1-8ff3-8f9c0bd6864b	2	fill_blank	The total price of the order is $______.	The barista says "That'll be six dollars fifty."	1	2026-09-15 02:06:50.287689+00	2026-09-17 09:53:26.055+00
01a0a2d1-23cd-74dc-9358-edeb9b06f7e3	01a0a2d1-23c6-7106-90da-c509e9a0e12b	0	multiple_choice	What did Tom do over the weekend?	Tom says "I went hiking with a few friends."	1	2026-09-15 02:06:50.31828+00	2026-09-17 09:53:26.118+00
01a0a2d1-23e6-7052-abaf-6abec9ea35e4	01a0a2d1-23c6-7106-90da-c509e9a0e12b	1	true_false	Anna has a free morning with no meetings.	Anna says "I've got three meetings before lunch", so her morning is busy.	1	2026-09-15 02:06:50.343398+00	2026-09-17 09:53:26.18+00
01a0a2d1-22d5-76f4-a335-084583fe4846	01a0a2d1-2296-7253-bd0e-6d3f2380827b	3	multiple_choice	Which sentence correctly compares two things?	Short adjectives take -er and are followed by "than".	1	2026-09-15 02:06:50.070219+00	2026-09-15 07:02:05.762+00
01a0a2d1-23f7-7544-89eb-87f410ba88b3	01a0a2d1-23c6-7106-90da-c509e9a0e12b	2	fill_blank	The team lunch is happening on ______.	Tom asks, "are you still coming to the team lunch on Friday?"	1	2026-09-15 02:06:50.360359+00	2026-09-17 09:53:26.205+00
01a0a2d1-240d-73df-b938-327cbbd508f1	01a0a2d1-2407-76cc-9395-cf8fc0d5d256	0	multiple_choice	How much does the passenger's suitcase weigh?	The agent says "That's twenty-two kilograms."	1	2026-09-15 02:06:50.38258+00	2026-09-17 09:53:26.255+00
01a0a2d1-2437-73ba-8773-29efe871bfa2	01a0a2d1-2407-76cc-9395-cf8fc0d5d256	1	true_false	The passenger asks for an aisle seat.	The passenger says "Window, please, if it's available."	1	2026-09-15 02:06:50.424486+00	2026-09-17 09:53:26.303+00
01a0a2d1-2477-70d9-a1f2-df4a78d29c86	01a0a2d1-2456-76d7-8b4d-10c0c3cbe9a6	1	true_false	The train station is a fifty-minute walk away.	The local says "About ten minutes."	1	2026-09-15 02:06:50.488196+00	2026-09-17 09:53:26.422+00
01a0a2d1-2487-72bb-839a-c62bed0e2334	01a0a2d1-2456-76d7-8b4d-10c0c3cbe9a6	2	fill_blank	The station is on the tourist's ______ side, past the small park.	The local says "The station will be on your right."	1	2026-09-15 02:06:50.50423+00	2026-09-17 09:53:26.449+00
01a0a2d1-249d-7398-ba4a-af0c1ebe169d	01a0a2d1-2498-7725-9ee8-facbe977b44a	0	multiple_choice	What is the topic of today's lecture?	The professor says they will look at "climate change and its economic impact."	1	2026-09-15 02:06:50.526544+00	2026-09-17 09:53:26.482+00
01a0a2d1-24b7-7165-b8e1-4ff5f67c91f7	01a0a2d1-2498-7725-9ee8-facbe977b44a	1	true_false	There is a reading assignment for the next class.	The professor says "please review the article posted on the course page."	1	2026-09-15 02:06:50.552146+00	2026-09-17 09:53:26.544+00
01a0a2d1-1e02-770d-99cc-b5f7400cb8b8	01a0a2d1-1dfa-7577-8521-f7ec48a4ed37	0	multiple_choice	Which word means "a small job you do at home, like washing dishes"?	"Chore" is a small routine task at home, e.g. washing dishes or taking out the trash.	1	2026-09-15 02:06:48.835936+00	2026-09-17 09:53:18.635+00
01a0a2d1-1e28-7510-9705-db2eff003a0c	01a0a2d1-1dfa-7577-8521-f7ec48a4ed37	1	true_false	"Wake up" and "get up" mean exactly the same thing.	"Wake up" means your sleep ends; "get up" means you leave the bed. You can wake up and stay in bed for a while before getting up.	1	2026-09-15 02:06:48.873247+00	2026-09-17 09:53:18.707+00
01a0a2d1-229c-71d2-9ee3-d5a852c2b8cc	01a0a2d1-2296-7253-bd0e-6d3f2380827b	0	multiple_choice	This book is ______ than that one.	One-syllable adjectives take -er: "cheaper".	1	2026-09-15 02:06:50.013348+00	2026-09-17 09:53:19.577+00
01a0a2d1-22bd-7671-bc05-e21b3356a592	01a0a2d1-2296-7253-bd0e-6d3f2380827b	1	fill_blank	She is the ______ (tall) student in the class.	Superlative of tall: "tallest".	1	2026-09-15 02:06:50.045942+00	2026-09-17 09:53:19.638+00
01a0a2d1-22cb-74da-b223-103b664ee256	01a0a2d1-2296-7253-bd0e-6d3f2380827b	2	true_false	"Gooder" is the comparative of "good".	The irregular comparative is "better", not "gooder".	1	2026-09-15 02:06:50.06019+00	2026-09-17 09:53:19.663+00
01a0a2d1-2187-77f6-9e44-471158085441	01a0a2d1-2158-74bc-b481-956f783c8f98	2	fill_blank	______ I open the window?	Asking permission politely: "Can" or "May". Accepted: "Can".	1	2026-09-15 02:06:49.736007+00	2026-09-17 09:53:19.81+00
01a0a2d1-22fb-77e4-b665-e305e3b51c7f	01a0a2d1-22f6-755b-bfa4-a25addd37628	0	multiple_choice	She is ______ honest person.	"Honest" begins with a vowel sound.	1	2026-09-15 02:06:50.108764+00	2026-09-17 09:53:20.892+00
01a0a2d1-2324-71d6-8ebd-18d939dc9174	01a0a2d1-22f6-755b-bfa4-a25addd37628	2	multiple_choice	______ sun rises in the east.	A unique object takes the definite article.	1	2026-09-15 02:06:50.148563+00	2026-09-17 09:53:20.985+00
01a0a2d1-239e-7162-bd8f-f59e1ff06479	01a0a2d1-2378-71a1-8ff3-8f9c0bd6864b	1	true_false	The customer is eating the muffin in the café.	The customer says "To go, thanks", meaning they are taking the order with them.	1	2026-09-15 02:06:50.271074+00	2026-09-17 09:53:26.005+00
01a0a2d1-2446-73d7-b08f-4c818f3a8d20	01a0a2d1-2407-76cc-9395-cf8fc0d5d256	2	fill_blank	Boarding starts at gate ______.	The agent says "boarding starts at gate 14 at 10:30."	1	2026-09-15 02:06:50.439434+00	2026-09-17 09:53:26.328+00
01a0a2d1-245c-722d-bb7a-e05d94a0effd	01a0a2d1-2456-76d7-8b4d-10c0c3cbe9a6	0	multiple_choice	Where should the tourist turn left?	The local says "turn left at the pharmacy."	1	2026-09-15 02:06:50.461664+00	2026-09-17 09:53:26.372+00
01a0a2d1-24c5-7004-ada9-c3bdd7e91ad5	01a0a2d1-2498-7725-9ee8-facbe977b44a	2	fill_blank	The case studies will start with ______ cities affected by rising sea levels.	The professor says "starting with coastal cities affected by rising sea levels."	1	2026-09-15 02:06:50.566773+00	2026-09-17 09:53:26.568+00
01a0a2d1-217a-72aa-80b6-c183729eb140	01a0a2d1-2158-74bc-b481-956f783c8f98	1	true_false	After a modal verb you use "to" + verb ("must to go").	Modals take the base verb with no "to": "must go".	1	2026-09-15 02:06:49.722456+00	2026-09-17 09:53:19.773+00
01a0a2d1-2316-70c8-808a-f1bc63f83a94	01a0a2d1-22f6-755b-bfa4-a25addd37628	1	fill_blank	I saw ______ dog. The dog was friendly.	This is the first mention of one dog.	1	2026-09-15 02:06:50.134703+00	2026-09-17 09:53:20.961+00
01a0a2d1-218f-723b-a03c-3d4637e155b9	01a0a2d1-2158-74bc-b481-956f783c8f98	3	multiple_choice	Which sentence expresses a weak possibility?	"Might" expresses something that is only possible, not certain.	1	2026-09-15 02:06:49.744508+00	2026-09-15 07:02:05.463+00
01a0a2d1-237d-7367-bd14-7749c5079a5a	01a0a2d1-2378-71a1-8ff3-8f9c0bd6864b	0	multiple_choice	What size latte does the customer order?	The customer says "can I have a medium latte, please?"	1	2026-09-15 02:06:50.238131+00	2026-09-17 09:53:25.922+00
01a0a3df-6589-756d-acae-f25fe12a2900	01a0a3df-655f-7376-993b-c32b844f0d51	1	fill_blank	We have a test ______ Monday.	Days of the week take on.	1	2026-09-15 07:02:01.867209+00	2026-09-17 09:53:23.238+00
01a0a3df-65a1-7602-a8f7-1456761dfab8	01a0a3df-655f-7376-993b-c32b844f0d51	2	multiple_choice	The keys are ______ the drawer.	The keys are inside an enclosed space.	1	2026-09-15 07:02:01.890331+00	2026-09-17 09:53:23.275+00
01a0a3df-65af-76b4-aac1-191f2011729b	01a0a3df-655f-7376-993b-c32b844f0d51	3	fill_blank	There is a picture ______ the wall.	Use on for a surface.	1	2026-09-15 07:02:01.904974+00	2026-09-17 09:53:23.361+00
01a0a3df-64e9-72f5-bdef-460a127e08aa	01a0a3df-64e2-7041-a975-cbf0d521ac06	0	multiple_choice	How ______ sugar do we need?	Sugar is uncountable, so use much.	1	2026-09-15 07:02:01.706293+00	2026-09-17 09:53:23.643+00
01a0a3df-650c-71bd-bf96-dd1a7ecb72b4	01a0a3df-64e2-7041-a975-cbf0d521ac06	1	fill_blank	There are only ______ (a small number of) seats left.	A few goes with plural countable nouns.	1	2026-09-15 07:02:01.741427+00	2026-09-17 09:53:23.729+00
01a0a3df-633e-7289-b2d2-e1bad2c814dc	01a0a3df-633a-7456-b48c-0f071a940070	0	multiple_choice	After she ______ the report, she went home.	The report was finished before she went home → Past Perfect.	1	2026-09-15 07:02:01.279273+00	2026-09-15 07:02:06.031+00
01a0a3df-6356-77e3-9804-0146a8205c55	01a0a3df-633a-7456-b48c-0f071a940070	1	true_false	"He had went home before I called" is correct.	The past participle of "go" is "gone", not "went": "had gone".	1	2026-09-15 07:02:01.302955+00	2026-09-15 07:02:06.059+00
01a0a3df-6363-7613-9541-6778fc5eefd4	01a0a3df-633a-7456-b48c-0f071a940070	2	fill_blank	They ______ (not/meet) before the conference.	Negative Past Perfect: hadn't + past participle → "hadn't met".	1	2026-09-15 07:02:01.316191+00	2026-09-15 07:02:06.081+00
01a0a3df-6371-710a-9ccb-7646d9327b1f	01a0a3df-633a-7456-b48c-0f071a940070	3	multiple_choice	Which sentence shows the correct time order?	Past Perfect marks the earlier event; Past Simple marks the later one.	1	2026-09-15 07:02:01.330397+00	2026-09-15 07:02:06.099+00
01a0a3df-6391-70d9-bc01-cfef6f291c21	01a0a3df-638c-7381-a7c1-99b2bca05571	0	multiple_choice	He ______ smoke, but he quit last year.	A past habit that is no longer true uses "used to" + base verb.	1	2026-09-15 07:02:01.362088+00	2026-09-15 07:02:06.134+00
01a0a3df-63a8-734c-ac96-940cc9339341	01a0a3df-638c-7381-a7c1-99b2bca05571	1	true_false	"Did she used to work here?" is correct.	After "Did", use "use to", not "used to".	1	2026-09-15 07:02:01.384623+00	2026-09-15 07:02:06.161+00
01a0a3df-63bb-74ac-b9dc-4e535fd7b56b	01a0a3df-638c-7381-a7c1-99b2bca05571	2	fill_blank	I ______ (not/like) spicy food when I was a child.	Negative: didn't use to + base verb.	1	2026-09-15 07:02:01.40361+00	2026-09-15 07:02:06.179+00
01a0a3df-63c9-7129-b201-2e520332c4b9	01a0a3df-638c-7381-a7c1-99b2bca05571	3	multiple_choice	Which sentence means a past habit that has changed?	"Used to" describes past habits/states that are no longer true.	1	2026-09-15 07:02:01.417626+00	2026-09-15 07:02:06.197+00
01a0a3df-64b1-71c9-88ea-90285c66231e	01a0a3df-6488-70f6-88d1-c374b080c5bd	2	multiple_choice	He is interested in ______ abroad.	A preposition is followed by a gerund.	1	2026-09-15 07:02:01.650224+00	2026-09-17 09:53:25.295+00
01a0a3df-64bb-7434-9fb4-490fc510a0e7	01a0a3df-6488-70f6-88d1-c374b080c5bd	3	fill_blank	I hope ______ (see) you soon.	Hope is followed by the infinitive.	1	2026-09-15 07:02:01.659496+00	2026-09-17 09:53:25.344+00
01a0a3df-643e-7668-8b94-b9517154107c	01a0a3df-6439-73e3-b84d-b92d510a876b	0	multiple_choice	“I am busy,” Mai said. Mai said that she ______ busy.	Present am normally backshifts to past was.	1	2026-09-15 07:02:01.53529+00	2026-09-17 09:53:25.49+00
01a0a3df-6455-75b7-be32-c2a685604009	01a0a3df-6439-73e3-b84d-b92d510a876b	1	fill_blank	“I will help,” he said. He said he ______ help.	Will backshifts to would.	1	2026-09-15 07:02:01.558254+00	2026-09-17 09:53:25.544+00
01a0a3df-6302-775d-8b2c-0ad2c0f49ad4	01a0a3df-62e3-7631-9fb6-26568475700a	1	fill_blank	They ______ (play) when the lights went out.	Use were + playing with they.	1	2026-09-15 07:02:01.218506+00	2026-09-17 09:53:21.744+00
01a0a3df-630f-72af-8a6b-cc72fee0b8d6	01a0a3df-62e3-7631-9fb6-26568475700a	2	multiple_choice	While she ______, the phone rang.	The longer background action takes past continuous.	1	2026-09-15 07:02:01.232171+00	2026-09-17 09:53:21.769+00
01a0a3df-631d-70ec-8add-2a648d7b134d	01a0a3df-62e3-7631-9fb6-26568475700a	3	fill_blank	What ______ you ______ (do) at noon?	A past continuous question begins with were for you.	1	2026-09-15 07:02:01.246415+00	2026-09-17 09:53:21.83+00
01a0a3df-6463-77cc-8899-5fd0df9ede61	01a0a3df-6439-73e3-b84d-b92d510a876b	2	multiple_choice	Which sentence is correct?	Tell takes a direct object; say does not in this pattern.	1	2026-09-15 07:02:01.571575+00	2026-09-17 09:53:25.564+00
01a0a2d1-2335-74cb-ab1b-9947367aded5	01a0a2d1-22f6-755b-bfa4-a25addd37628	3	fill_blank	Please close ______ door.	The context identifies the particular door.	1	2026-09-15 02:06:50.166038+00	2026-09-17 09:53:21.047+00
01a0a3df-62e8-73a0-9c7e-9adaf47d44dc	01a0a3df-62e3-7631-9fb6-26568475700a	0	multiple_choice	At 9 last night, I ______.	The action was in progress at a past time.	1	2026-09-15 07:02:01.193097+00	2026-09-17 09:53:21.683+00
01a0a3df-6412-71e4-92c5-496c57e35642	01a0a3df-63e6-779a-8f5f-07064f6bd953	2	multiple_choice	This is the café ______ we first met.	Where refers to a place.	1	2026-09-15 07:02:01.4912+00	2026-09-17 09:53:25.029+00
01a0a3df-641c-7277-b7be-e40c21814b27	01a0a3df-63e6-779a-8f5f-07064f6bd953	3	fill_blank	Students ______ study regularly improve faster.	Who is the subject referring to people.	1	2026-09-15 07:02:01.500837+00	2026-09-17 09:53:25.079+00
01a0a3df-648d-7499-b0a9-ca80bbb97cf2	01a0a3df-6488-70f6-88d1-c374b080c5bd	0	multiple_choice	She enjoys ______ new languages.	Enjoy is followed by a gerund.	1	2026-09-15 07:02:01.613541+00	2026-09-17 09:53:25.221+00
01a0a3df-64a3-73ed-8fe2-cb5763cd7f59	01a0a3df-6488-70f6-88d1-c374b080c5bd	1	fill_blank	We decided ______ (leave) early.	Decide is followed by to + base verb.	1	2026-09-15 07:02:01.635628+00	2026-09-17 09:53:25.275+00
01a0a3df-6521-73b7-ba8b-ece575afad6f	01a0a3df-64e2-7041-a975-cbf0d521ac06	2	multiple_choice	We don't have ______ information.	Much is used with an uncountable noun in a negative sentence.	1	2026-09-15 07:02:01.762283+00	2026-09-17 09:53:23.764+00
01a0a3df-6535-7435-849c-9e13fc945066	01a0a3df-64e2-7041-a975-cbf0d521ac06	3	fill_blank	She has ______ friends in this city, so she is not lonely.	A few means some, with a positive implication.	1	2026-09-15 07:02:01.783095+00	2026-09-17 09:53:23.838+00
01a0a3df-63eb-72fd-999c-123f301ed0f2	01a0a3df-63e6-779a-8f5f-07064f6bd953	0	multiple_choice	The teacher ______ helped me was very patient.	Who refers to a person and is the subject of the clause.	1	2026-09-15 07:02:01.45203+00	2026-09-17 09:53:24.957+00
01a0a3df-6404-7244-a476-5062ecc1cf05	01a0a3df-63e6-779a-8f5f-07064f6bd953	1	fill_blank	The laptop ______ I bought is very light.	That can introduce a defining object relative clause.	1	2026-09-15 07:02:01.477781+00	2026-09-17 09:53:25.006+00
01a0a3df-65e4-72db-a696-337e2334d43b	01a0a3df-65dd-72b2-8288-954ec9d5f603	0	multiple_choice	I wish I ______ speak Japanese fluently. (present regret)	Present regrets after wish use Past Simple: "could".	1	2026-09-15 07:02:01.957641+00	2026-09-15 07:02:06.76+00
01a0a3df-6605-73a5-8969-a5203adf17da	01a0a3df-65dd-72b2-8288-954ec9d5f603	1	true_false	"I wish I had gone to the party" expresses regret about the past.	wish + Past Perfect looks back at a past situation.	1	2026-09-15 07:02:01.990408+00	2026-09-15 07:02:06.787+00
01a0a3df-6619-728d-8543-36bbb606d7b2	01a0a3df-65dd-72b2-8288-954ec9d5f603	2	fill_blank	If only she ______ (tell) me the truth earlier. [past regret]	Past regret → Past Perfect: "had told".	1	2026-09-15 07:02:02.011014+00	2026-09-15 07:02:06.805+00
01a0a3df-6627-7307-8158-11fc988ce0d3	01a0a3df-65dd-72b2-8288-954ec9d5f603	3	multiple_choice	Which sentence correctly shows annoyance about a habit?	wish + would is used for desired change in someone else's behaviour.	1	2026-09-15 07:02:02.025065+00	2026-09-15 07:02:06.817+00
01a0a3df-6658-730a-81fa-1762a74914b7	01a0a3df-6651-76e9-9c60-3f6ce414adb2	0	multiple_choice	You're a student, ______?	Positive "are" statement → negative tag "aren't you".	1	2026-09-15 07:02:02.073756+00	2026-09-15 07:02:06.856+00
01a0a3df-6679-7378-b207-b9482fa6c1fa	01a0a3df-6651-76e9-9c60-3f6ce414adb2	1	true_false	"He doesn't work here, does he?" is correctly formed.	Negative statement takes a positive tag with the same auxiliary.	1	2026-09-15 07:02:02.106761+00	2026-09-15 07:02:06.882+00
01a0a3df-668d-7042-8ac6-b039dc9a70c3	01a0a3df-6651-76e9-9c60-3f6ce414adb2	2	fill_blank	They left early, ______ they?	Past Simple with no auxiliary uses "didn't" in the tag: "didn't they".	1	2026-09-15 07:02:02.127172+00	2026-09-15 07:02:06.898+00
01a0a3df-669b-71a0-925c-f37220afcebc	01a0a3df-6651-76e9-9c60-3f6ce414adb2	3	multiple_choice	Which tag is correct? "Let's take a break, ______?"	Suggestions with "Let's" take the tag "shall we".	1	2026-09-15 07:02:02.140767+00	2026-09-15 07:02:06.908+00
01a0a3df-6566-702d-9ded-b1e5bef8c087	01a0a3df-655f-7376-993b-c32b844f0d51	0	multiple_choice	The class begins ______ 8:30.	Use at with a precise clock time.	1	2026-09-15 07:02:01.83149+00	2026-09-17 09:53:23.165+00
01a0a913-8043-7368-90ef-87740c5f1401	01a0a913-8006-7187-987e-07a545489f51	1	fill_blank	Look at those clouds! It ______ (rain).	Visible evidence favors be going to.	1	2026-09-16 07:17:02.660594+00	2026-09-17 09:53:22.099+00
01a0a913-805b-730a-b673-05a1e9597477	01a0a913-8006-7187-987e-07a545489f51	2	multiple_choice	We bought the tickets yesterday. We ______ fly on Friday.	The arrangement already exists.	1	2026-09-16 07:17:02.684589+00	2026-09-17 09:53:22.124+00
01a0a913-8090-7431-a93d-f5efb36aabe7	01a0a913-8006-7187-987e-07a545489f51	3	fill_blank	I promise I ______ (help) you.	A promise commonly uses will.	1	2026-09-16 07:17:02.737526+00	2026-09-17 09:53:22.185+00
01a0a913-811f-734f-a5b8-45137ca6b595	01a0a913-8113-75e5-886f-87f7517e9fb8	0	multiple_choice	When I was five, I ______ read simple books.	Could expresses general ability in the past.	1	2026-09-16 07:17:02.880724+00	2026-09-17 09:53:22.393+00
01a0a913-8153-7754-8ec1-f117e9b3b14a	01a0a913-8113-75e5-886f-87f7517e9fb8	1	fill_blank	______ you open the window, please?	Could makes the request polite.	1	2026-09-16 07:17:02.932082+00	2026-09-17 09:53:22.467+00
01a0a913-8168-7348-b07b-4de65834997e	01a0a913-8113-75e5-886f-87f7517e9fb8	2	multiple_choice	Which sentence is correct?	A modal is followed by the base verb.	1	2026-09-16 07:17:02.953592+00	2026-09-17 09:53:22.504+00
01a0a913-8191-7768-be29-4104443397f9	01a0a913-8113-75e5-886f-87f7517e9fb8	3	fill_blank	He ______ (not/can) come today.	The negative form can be written cannot.	1	2026-09-16 07:17:02.994184+00	2026-09-17 09:53:22.565+00
01a0a913-8220-7218-b562-a26bc0d675a7	01a0a913-8214-741e-aba5-824d2b78b7fd	0	multiple_choice	A train is usually ______ than a bus.	Fast is a short adjective, so add -er.	1	2026-09-16 07:17:03.137707+00	2026-09-17 09:53:22.76+00
01a0a913-8252-72d3-8774-15571ee26678	01a0a913-8214-741e-aba5-824d2b78b7fd	1	fill_blank	This is ______ (interesting) book in the series.	A long adjective uses the most in the superlative.	1	2026-09-16 07:17:03.187414+00	2026-09-17 09:53:22.822+00
01a0a913-86d0-7622-b3ad-a65a0d194d6d	01a0a913-8666-7160-a501-a2947406376a	2	multiple_choice	Why are you wet? I ______ in the rain.	Present evidence points to a recent activity.	1	2026-09-16 07:17:04.337245+00	2026-09-17 09:53:24.487+00
01a0a913-86f8-77f0-b33e-4db909f074fe	01a0a913-8666-7160-a501-a2947406376a	3	fill_blank	How long ______ he ______ (learn) English?	The question uses has + subject + been + V-ing.	1	2026-09-16 07:17:04.377784+00	2026-09-17 09:53:24.548+00
01a0a913-8774-744f-94f9-3f9e76c8e20e	01a0a913-8769-7432-8ef1-b00e8849eca5	0	multiple_choice	Coffee ______ in many countries.	A present fact with a singular subject uses is + V3.	1	2026-09-16 07:17:04.500816+00	2026-09-17 09:53:24.688+00
01a0a913-87a0-7386-b510-882eb5e8c36f	01a0a913-8769-7432-8ef1-b00e8849eca5	1	fill_blank	The emails ______ (send) yesterday.	A plural subject in the past passive takes were sent.	1	2026-09-16 07:17:04.545281+00	2026-09-17 09:53:24.744+00
01a0a913-87b0-737d-aa4b-d11dfa9cef95	01a0a913-8769-7432-8ef1-b00e8849eca5	2	multiple_choice	Which sentence is passive?	The object of the action is the grammatical subject.	1	2026-09-16 07:17:04.560643+00	2026-09-17 09:53:24.761+00
01a0a913-87d6-75ad-9030-c7e5d7215ab4	01a0a913-8769-7432-8ef1-b00e8849eca5	3	fill_blank	This room ______ (clean) every day.	A present routine in passive form uses is cleaned.	1	2026-09-16 07:17:04.605685+00	2026-09-17 09:53:24.821+00
01a0a3df-646c-70be-86fd-34c67e7e55ca	01a0a3df-6439-73e3-b84d-b92d510a876b	3	fill_blank	“We can swim,” they said. They said they ______ swim.	Can normally backshifts to could.	1	2026-09-15 07:02:01.580993+00	2026-09-17 09:53:25.617+00
01a0a913-8269-7201-b908-54bfdd3a8e61	01a0a913-8214-741e-aba5-824d2b78b7fd	2	multiple_choice	The weather today is ______ yesterday.	Worse is the irregular comparative of bad.	1	2026-09-16 07:17:03.210897+00	2026-09-17 09:53:22.847+00
01a0a913-829e-75f9-b0f6-fa6a21d24689	01a0a913-8214-741e-aba5-824d2b78b7fd	3	fill_blank	My room is ______ (small) than yours.	Small takes the -er comparative ending.	1	2026-09-16 07:17:03.263445+00	2026-09-17 09:53:22.91+00
01a0a913-8535-730a-b306-f6106f080bc5	01a0a913-8529-728c-a2c9-f4a5b0bf5003	0	multiple_choice	If you mix blue and yellow, you ______ green.	A general fact uses present simple in both clauses.	1	2026-09-16 07:17:03.932203+00	2026-09-17 09:53:24.046+00
01a0a913-8561-75f5-886b-476a51684e60	01a0a913-8529-728c-a2c9-f4a5b0bf5003	1	fill_blank	If she ______ (finish) early, she will call us.	The if-clause of a first conditional takes present simple.	1	2026-09-16 07:17:03.970166+00	2026-09-17 09:53:24.12+00
01a0a913-8572-73cc-a3a9-739d4e52f17a	01a0a913-8529-728c-a2c9-f4a5b0bf5003	2	multiple_choice	If we miss the bus, we ______ a taxi.	A realistic future result uses will + base verb.	1	2026-09-16 07:17:03.993591+00	2026-09-17 09:53:24.149+00
01a0a913-85c3-72f9-b263-d713dca22eea	01a0a913-8529-728c-a2c9-f4a5b0bf5003	3	fill_blank	Plants die if they ______ (not/get) water.	A zero conditional uses present simple.	1	2026-09-16 07:17:04.069108+00	2026-09-17 09:53:24.217+00
01a0a913-867a-75df-a19e-b6a1ab59d126	01a0a913-8666-7160-a501-a2947406376a	0	multiple_choice	She ______ all morning.	An activity continuing over a period uses has been + V-ing.	1	2026-09-16 07:17:04.251487+00	2026-09-17 09:53:24.392+00
01a0a913-86b8-702f-a929-9d6ad00ca29b	01a0a913-8666-7160-a501-a2947406376a	1	fill_blank	They ______ (work) here since January.	Use have been working with they.	1	2026-09-16 07:17:04.31412+00	2026-09-17 09:53:24.462+00
01a0a913-8012-73e4-b168-202b67e2d8e5	01a0a913-8006-7187-987e-07a545489f51	0	multiple_choice	The phone is ringing. I ______ answer it.	This is a decision made at the moment of speaking.	1	2026-09-16 07:17:02.611098+00	2026-09-17 09:53:22.03+00
\.


--
-- Data for Name: quizzes; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.quizzes (id, slug, title, description, reveal_mode, pass_score, time_limit_seconds, created_at, updated_at) FROM stdin;
01a0a3df-63e6-779a-8f5f-07064f6bd953	relative-clauses-quiz	Relative Clauses — Mini Quiz	Connect information with relative pronouns.	after_submit	70	\N	2026-09-15 07:02:01.447365+00	2026-09-17 09:53:24.952+00
01a0a913-8529-728c-a2c9-f4a5b0bf5003	conditionals-zero-first-quiz	Zero and First Conditionals — Mini Quiz	Practice facts and realistic future conditions.	after_submit	70	\N	2026-09-16 07:17:03.920409+00	2026-09-17 09:53:24.034+00
01a0a3df-633a-7456-b48c-0f071a940070	past-perfect-quiz	Past Perfect — Mini Quiz	Practice had + past participle for earlier past actions.	after_submit	70	\N	2026-09-15 07:02:01.27468+00	2026-09-15 07:02:06.023+00
01a0a3df-638c-7381-a7c1-99b2bca05571	used-to-quiz	Used to — Mini Quiz	Practice past habits with used to / didn't use to.	after_submit	70	\N	2026-09-15 07:02:01.35738+00	2026-09-15 07:02:06.128+00
01a0a3df-62e3-7631-9fb6-26568475700a	past-continuous-quiz	Past Continuous — Mini Quiz	Practice ongoing and interrupted actions in the past.	after_submit	70	\N	2026-09-15 07:02:01.18836+00	2026-09-17 09:53:21.671+00
01a0a913-8214-741e-aba5-824d2b78b7fd	comparatives-superlatives-quiz	Comparatives and Superlatives — Mini Quiz	Practice comparing people, places, and things.	after_submit	70	\N	2026-09-16 07:17:03.125646+00	2026-09-17 09:53:22.74+00
01a0a2d1-2041-7599-9d22-ce690ceb7d4f	past-simple-quiz	Past Simple — Mini Quiz	Test your understanding of the Past Simple tense.	after_submit	70	\N	2026-09-15 02:06:49.410383+00	2026-09-17 09:53:20.36+00
01a0a2d1-2091-71f5-814e-bcfba328283a	present-perfect-quiz	Present Perfect — Mini Quiz	Test your understanding of the Present Perfect tense.	after_submit	70	\N	2026-09-15 02:06:49.490621+00	2026-09-17 09:53:20.635+00
01a0a913-8666-7160-a501-a2947406376a	present-perfect-continuous-quiz	Present Perfect Continuous — Mini Quiz	Practice duration and recently continuing activities.	after_submit	70	\N	2026-09-16 07:17:04.231619+00	2026-09-17 09:53:24.379+00
01a0a3df-65dd-72b2-8288-954ec9d5f603	wish-if-only-quiz	Wish / If only — Mini Quiz	Choose the right tense after wish / if only.	after_submit	70	\N	2026-09-15 07:02:01.950905+00	2026-09-15 07:02:06.754+00
01a0a3df-6651-76e9-9c60-3f6ce414adb2	question-tags-quiz	Question Tags — Mini Quiz	Complete statements with the correct question tag.	after_submit	70	\N	2026-09-15 07:02:02.06687+00	2026-09-15 07:02:06.851+00
01a0a3df-6488-70f6-88d1-c374b080c5bd	gerunds-infinitives-quiz	Gerunds and Infinitives — Mini Quiz	Practice common verb patterns with -ing and to.	after_submit	70	\N	2026-09-15 07:02:01.60916+00	2026-09-17 09:53:25.209+00
01a0a3df-6439-73e3-b84d-b92d510a876b	reported-speech-quiz	Reported Speech — Mini Quiz	Practice reporting statements and changing viewpoint.	after_submit	70	\N	2026-09-15 07:02:01.530174+00	2026-09-17 09:53:25.478+00
01a0a913-8006-7187-987e-07a545489f51	future-will-going-to-quiz	Will and Going To — Mini Quiz	Choose the natural future form for each context.	after_submit	70	\N	2026-09-16 07:17:02.599097+00	2026-09-17 09:53:22.017+00
01a0a913-8113-75e5-886f-87f7517e9fb8	modals-can-could-quiz	Can and Could — Mini Quiz	Practice ability, permission, and polite requests.	after_submit	70	\N	2026-09-16 07:17:02.871214+00	2026-09-17 09:53:22.381+00
01a0a3df-655f-7376-993b-c32b844f0d51	prepositions-time-place-quiz	Prepositions of Time and Place — Mini Quiz	Practice in, on, and at in common contexts.	after_submit	70	\N	2026-09-15 07:02:01.824419+00	2026-09-17 09:53:23.152+00
01a0a3df-64e2-7041-a975-cbf0d521ac06	quantifiers-quiz	Quantifiers — Mini Quiz	Choose quantifiers for countable and uncountable nouns.	after_submit	70	\N	2026-09-15 07:02:01.699859+00	2026-09-17 09:53:23.629+00
01a0a2d1-2456-76d7-8b4d-10c0c3cbe9a6	asking-for-directions-quiz	Asking for Directions — Comprehension Quiz	Check your understanding of the directions conversation.	after_submit	70	\N	2026-09-15 02:06:50.455663+00	2026-09-17 09:53:26.363+00
01a0a2d1-20ed-71c8-9e4d-33fbef6b7f28	future-forms-quiz	Future Forms — Mini Quiz	Test your understanding of will, be going to, and the present continuous for the future.	after_submit	70	\N	2026-09-15 02:06:49.582427+00	2026-09-15 07:02:05.259+00
01a0a2d1-21ac-751f-89e5-7c3fc7cfea85	conditionals-quiz	Conditionals — Mini Quiz	Test your understanding of zero, first and second conditionals.	after_submit	70	\N	2026-09-15 02:06:49.773342+00	2026-09-15 07:02:05.506+00
01a0a2d1-2220-7113-a42c-e85af0c1cf7f	passive-voice-quiz	Passive Voice — Mini Quiz	Test your understanding of the passive voice.	after_submit	70	\N	2026-09-15 02:06:49.889271+00	2026-09-15 07:02:05.618+00
01a0a913-8769-7432-8ef1-b00e8849eca5	passive-present-past-quiz	Present and Past Passive — Mini Quiz	Practice forming passive sentences with be and V3.	after_submit	70	\N	2026-09-16 07:17:04.495928+00	2026-09-17 09:53:24.683+00
01a0a2d1-2378-71a1-8ff3-8f9c0bd6864b	ordering-coffee-quiz	Ordering Coffee — Comprehension Quiz	Check your understanding of the coffee shop conversation.	after_submit	70	\N	2026-09-15 02:06:50.233321+00	2026-09-17 09:53:25.908+00
01a0a2d1-23c6-7106-90da-c509e9a0e12b	small-talk-at-work-quiz	Making Small Talk at Work — Comprehension Quiz	Check your understanding of the workplace conversation.	after_submit	70	\N	2026-09-15 02:06:50.311071+00	2026-09-17 09:53:26.104+00
01a0a2d1-2407-76cc-9395-cf8fc0d5d256	airport-check-in-quiz	Checking in at the Airport — Comprehension Quiz	Check your understanding of the airport check-in conversation.	after_submit	70	\N	2026-09-15 02:06:50.377057+00	2026-09-17 09:53:26.25+00
01a0a2d1-2498-7725-9ee8-facbe977b44a	university-lecture-intro-quiz	University Lecture Introduction — Comprehension Quiz	Check your understanding of the lecture introduction.	after_submit	70	\N	2026-09-15 02:06:50.520959+00	2026-09-17 09:53:26.474+00
01a0a2d1-2296-7253-bd0e-6d3f2380827b	comparatives-quiz	Comparatives — Mini Quiz	Comparing people and things.	after_submit	70	\N	2026-09-15 02:06:50.006954+00	2026-09-17 09:53:19.566+00
01a0a2d1-2158-74bc-b481-956f783c8f98	modal-verbs-quiz	Modal Verbs — Mini Quiz	should / must / can for advice and obligation.	after_submit	70	\N	2026-09-15 02:06:49.689614+00	2026-09-17 09:53:19.699+00
01a0a2d1-1dfa-7577-8521-f7ec48a4ed37	everyday-english-practice	Everyday English — Vocabulary Practice	Check what you remember about daily routines, home and food.	after_submit	70	\N	2026-09-15 02:06:48.827965+00	2026-09-17 09:53:18.59+00
01a0a2d1-1e63-7514-ba5e-b52ea4cdb65a	english-conversation-practice	English Conversation — Vocabulary Practice	Practice words for sharing opinions and talking about feelings.	after_submit	70	\N	2026-09-15 02:06:48.932758+00	2026-09-17 09:53:18.823+00
01a0a2d1-1eb9-7373-a4b2-1a45bf883e05	english-for-travel-practice	English for Travel — Vocabulary Practice	Practice words you'll need at the airport and hotel.	after_submit	70	\N	2026-09-15 02:06:49.018744+00	2026-09-17 09:53:19.006+00
01a0a2d1-1f10-73d3-8ab5-36fb9b1f02e9	academic-english-practice	Academic English — Vocabulary Practice	Practice formal vocabulary used in essays and research.	after_submit	70	\N	2026-09-15 02:06:49.10572+00	2026-09-17 09:53:19.213+00
01a0a2d1-1f73-71a0-87b3-55ef05b5b0fa	present-simple-quiz	Present Simple — Mini Quiz	Test your understanding of the Present Simple tense.	after_submit	70	\N	2026-09-15 02:06:49.203835+00	2026-09-17 09:53:19.913+00
01a0a2d1-22f6-755b-bfa4-a25addd37628	articles-quiz	Articles — Mini Quiz	Practice a, an, the, and the zero article.	after_submit	70	\N	2026-09-15 02:06:50.103167+00	2026-09-17 09:53:20.878+00
01a0a2d1-1fd8-7047-afb9-07f25f2cc588	present-continuous-quiz	Present Continuous — Mini Quiz	Practice actions happening now and temporary situations.	after_submit	70	\N	2026-09-15 02:06:49.305759+00	2026-09-17 09:53:21.254+00
\.


--
-- Data for Name: sessions; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.sessions (id, user_id, token, expires_at, ip_address, user_agent, created_at, updated_at) FROM stdin;
01a0a3c9-5a13-735f-a297-d6c04d37fb6d	01a0a3b9-7821-7357-9b65-af7f4ca1999b	WwsD8CQWE9VWFiIdF1EnmQXdTPFuDVxH	2026-09-22 06:37:57.138+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	2026-09-15 06:37:57.138+00	2026-09-15 06:37:57.138+00
01a0a81a-020a-7094-a2c5-482c96d412f2	01a0a81a-01f0-7063-94bc-c7e91d8f52d0	rsWfPgb4t6mAXr8Y6CLA1gAAtz3zRtyu	2026-09-23 02:44:31.881+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:44:31.882+00	2026-09-16 02:44:31.882+00
01a0a81a-9c8e-7051-8a34-01e234f08fe4	01a0a81a-9c2e-76b8-9a53-1ed8c8841d7d	qyBZ4JKOt9T6NibQuSVq6j1nhH0ykTSQ	2026-09-23 02:45:11.438+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:45:11.438+00	2026-09-16 02:45:11.438+00
01a0a81b-9fd3-7151-83cc-5da99fc2628a	01a0a81b-9fac-74eb-9bd9-6f1435dd56e5	47vtVd7lg5iMmqWFDLTwm1bJkFdzl9Ln	2026-09-23 02:46:17.81+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:46:17.811+00	2026-09-16 02:46:17.811+00
01a0a81c-ef01-72d5-8a0b-2adac5ff8e27	01a0a81c-eed9-7564-b14a-d31e1578bdb7	IHA2vabVa2MzC9fYwp07XwfFbmLZl7mt	2026-09-23 02:47:43.616+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:47:43.617+00	2026-09-16 02:47:43.617+00
01a0a81d-34e5-75f8-a84e-e656937c35df	01a0a81d-3446-747e-99f8-685c3e2eadc0	Mf4qF6hxaCJG3sRp0BfKRZAxYrFO58Cd	2026-09-23 02:48:01.508+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:48:01.508+00	2026-09-16 02:48:01.508+00
01a0a81d-aa08-7722-8cd1-8f893c4b878b	01a0a81d-a9d9-7628-858c-7df9026379b6	jcWHazHPKEgPdR2fifm422DqMuO9JjbH	2026-09-23 02:48:31.494+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:48:31.495+00	2026-09-16 02:48:31.495+00
01a0a81f-80be-731e-afe9-ace012f0b8cf	01a0a81f-7e75-73ec-9081-3c5b2bec9caf	XjfTkzM8eX2Z4P8sj6MIEsm3gHMJ6VVj	2026-09-23 02:50:31.991+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) HeadlessChrome/153.0.8010.12 Safari/537.36	2026-09-16 02:50:31.998+00	2026-09-16 02:50:31.998+00
01a0a91c-86a0-7291-b3ce-773218188ce6	01a0a91c-8681-77b9-9899-98e3cd8c3983	N23O9bD9KSDucaXaPWQNg5HY4jL4t9iu	2026-09-23 07:26:54.111+00	172.20.0.1	curl/8.5.0	2026-09-16 07:26:54.111+00	2026-09-16 07:26:54.111+00
01a0a91d-82ec-731c-a8d8-d1cb87f70022	01a0a91d-82d8-71df-94ae-8ce6b435f90a	ySGcBvmYmtKJnKczfYpk4WIum4Itveyh	2026-09-23 07:27:58.7+00	172.20.0.1	curl/8.5.0	2026-09-16 07:27:58.7+00	2026-09-16 07:27:58.7+00
01a0a940-6473-76bf-96d1-a1d124368699	01a0a3b9-7821-7357-9b65-af7f4ca1999b	hijiqfofa0kXBHtbQ1dfQeBQRY6ztSjA	2026-09-23 08:06:04.658+00	172.20.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	2026-09-16 08:06:04.658+00	2026-09-16 08:06:04.658+00
01a0a964-a71f-70fe-a5a8-c849bc7b3d69	01a0a3b9-7821-7357-9b65-af7f4ca1999b	KD1MSbXh6F9g7XSzXd36pMJYz8S5IjuQ	2026-09-23 08:45:41.02+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	2026-09-16 08:45:41.021+00	2026-09-16 08:45:41.021+00
01a0a972-ccef-724d-bd90-1705558fcb98	01a0a3b9-7821-7357-9b65-af7f4ca1999b	dYP807V3HcX8F8D3mYxok85uFYYKp2Qk	2026-09-23 09:01:08.205+00	172.20.0.1	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	2026-09-16 09:01:08.206+00	2026-09-16 09:01:08.206+00
01a0a3b9-784e-74d6-afe8-bf37d6414fda	01a0a3b9-7821-7357-9b65-af7f4ca1999b	BSAfEATQoTiCFisndcxofoEDEqId3EWt	2026-09-24 02:08:36.653+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Cursor/3.6.31 Chrome/142.0.7444.265 Electron/39.8.1 Safari/537.36	2026-09-15 06:20:36.301+00	2026-09-17 02:08:36.653+00
01a0ad29-96a9-7750-baf2-b258f73f1d29	01a0a3b9-7821-7357-9b65-af7f4ca1999b	qvZySjiHPTNRlQgSuc0rMPoMJjBVDTEl	2026-09-24 02:19:39.043+00	0000:0000:0000:0000:0000:0000:0000:0000	Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36	2026-09-17 02:19:39.046+00	2026-09-17 02:19:39.046+00
\.


--
-- Data for Name: user_achievements; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_achievements (id, user_id, achievement_key, unlocked_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_daily_activity; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_daily_activity (id, user_id, activity_date, minutes, lessons_completed, words_saved, quizzes_completed, created_at, updated_at) FROM stdin;
01a0a3bb-9603-7656-80f3-b926a1d41f36	01a0a3b9-7821-7357-9b65-af7f4ca1999b	2026-09-15	1	0	2	0	2026-09-15 06:22:54.983022+00	2026-09-15 08:17:48.744+00
01a0ad29-1be0-71fe-bdf9-680e5b305201	01a0a3b9-7821-7357-9b65-af7f4ca1999b	2026-09-17	20	0	2	1	2026-09-17 02:19:07.61921+00	2026-09-17 07:50:29.39+00
\.


--
-- Data for Name: user_grammar_progress; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_grammar_progress (user_id, topic_id, attempt_count, correct_count, mastery_score, last_attempt_at, next_review_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: user_progress; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_progress (id, user_id, lesson_id, status, progress_percent, completed_at, created_at, updated_at) FROM stdin;
01a0a3bc-40c8-7218-bccb-004dcec07576	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-24dd-768d-8495-01f727ae6d43	in_progress	73	\N	2026-09-15 06:23:38.698538+00	2026-09-16 08:06:41.321+00
01a0a3bb-8781-73c0-ab83-890ff1578046	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-2701-769a-9ccf-c0ad47474990	in_progress	64	\N	2026-09-15 06:22:51.267527+00	2026-09-17 07:30:36.284+00
\.


--
-- Data for Name: user_vocabularies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.user_vocabularies (id, user_id, vocabulary_id, saved_at, is_learned, learned_at, last_reviewed_at, review_count, next_review_at, created_at, updated_at, is_pinned) FROM stdin;
01a0ad29-1bd5-71e6-8e4e-d4cc68340527	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0ad29-1bc2-73db-a221-c12335764762	2026-09-17 02:19:07.606762+00	t	2026-09-17 06:40:46.922+00	2026-09-17 06:40:46.922+00	1	2026-09-18 06:40:46.922+00	2026-09-17 02:19:07.606762+00	2026-09-17 06:40:46.922+00	f
01a0a3bb-95f3-77d1-b3e5-8db96251bcfb	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-1d9e-7539-bba7-c43e5c5e93f3	2026-09-15 06:22:54.966192+00	t	2026-09-17 06:40:52.054+00	2026-09-17 06:40:52.054+00	2	2026-09-18 06:40:52.054+00	2026-09-15 06:22:54.966192+00	2026-09-17 06:40:52.054+00	f
01a0a3bb-9958-7632-bef9-821e7590db31	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-1d9e-7539-bba7-cd915316296d	2026-09-15 06:22:55.833315+00	t	2026-09-17 06:40:54.968+00	2026-09-17 06:40:54.968+00	3	2026-09-18 06:40:54.968+00	2026-09-15 06:22:55.833315+00	2026-09-17 06:40:54.968+00	f
01a0ae53-684e-7776-82a8-e8969e336010	01a0a3b9-7821-7357-9b65-af7f4ca1999b	01a0a2d1-1d9f-76cd-bdf6-331eab7b929c	2026-09-17 07:44:56.91377+00	f	\N	\N	0	\N	2026-09-17 07:44:56.91377+00	2026-09-17 07:44:56.91377+00	f
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.users (id, name, email, email_verified, image, cefr_level, daily_goal_minutes, preferred_learning_time, timezone, onboarded_at, created_at, updated_at) FROM stdin;
01a0a3b9-7821-7357-9b65-af7f4ca1999b	Triet Le	triet.le@gmail.com	f	\N	B2	20	\N	Asia/Ho_Chi_Minh	2026-09-15 06:21:59.403+00	2026-09-15 06:20:36.255+00	2026-09-15 06:21:59.403+00
01a0a81a-01f0-7063-94bc-c7e91d8f52d0	Nav Test	navtest_1789526665513@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:44:31.853+00	2026-09-16 02:44:31.853+00
01a0a81a-9c2e-76b8-9a53-1ed8c8841d7d	Nav Test	navtest2_1789526710961@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:45:11.341+00	2026-09-16 02:45:11.341+00
01a0a81b-9fac-74eb-9bd9-6f1435dd56e5	N	navtest3_1789526776977@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:46:17.772+00	2026-09-16 02:46:17.772+00
01a0a81c-eed9-7564-b14a-d31e1578bdb7	N	navtab_1789526863021@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:47:43.577+00	2026-09-16 02:47:43.577+00
01a0a81d-3446-747e-99f8-685c3e2eadc0	M	m_1789526880113@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:48:01.335+00	2026-09-16 02:48:01.335+00
01a0a81d-a9d9-7628-858c-7df9026379b6	U	full_1789526910639@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:48:31.448+00	2026-09-16 02:48:31.448+00
01a0a81f-7e75-73ec-9081-3c5b2bec9caf	U	fix_1789527010416@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 02:50:31.411+00	2026-09-16 02:50:31.411+00
01a0a91c-8681-77b9-9899-98e3cd8c3983	Reload Test	reloadtest-1789543613@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 07:26:54.08+00	2026-09-16 07:26:54.08+00
01a0a91d-82d8-71df-94ae-8ce6b435f90a	Loop	loop-1789543678@example.com	f	\N	\N	20	\N	Asia/Ho_Chi_Minh	\N	2026-09-16 07:27:58.679+00	2026-09-16 07:27:58.679+00
\.


--
-- Data for Name: verifications; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.verifications (id, identifier, value, expires_at, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: vocabularies; Type: TABLE DATA; Schema: public; Owner: -
--

COPY public.vocabularies (id, word, pronunciation, phonetic, part_of_speech, meaning, example_sentence, audio_url, difficulty, created_at, updated_at, is_manual, created_by_user_id, catalog_source, topic) FROM stdin;
01a0a2d1-1d9d-7087-8671-43ca643517ce	landlord	LAND-lord	/ˈlænd.lɔːrd/	noun	chủ nhà (cho thuê)	The landlord fixed the broken window.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-49eb3dcca974	appliance	uh-PLY-uhns	/əˈplaɪ.əns/	noun	thiết bị gia dụng	The washing machine is a useful appliance.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-4dd70ce36b51	ingredient	in-GREE-dee-uhnt	/ɪnˈɡriː.di.ənt/	noun	nguyên liệu	Flour is the main ingredient in bread.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-508d22fbe584	recipe	RES-uh-pee	/ˈres.ə.pi/	noun	công thức nấu ăn	Can you send me the recipe for this soup?	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-bec0d36ac7e6	customs	KUHS-tuhmz	/ˈkʌs.təmz/	noun	hải quan	We had to go through customs at the airport.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-a7fb2ce697b0	decrease	dih-KREES	/dɪˈkriːs/	verb	giảm xuống	The company's profits decreased this year.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-a94769c7432b	consider	kuhn-SID-er	/kənˈsɪd.ər/	verb	xem xét, cân nhắc	Please consider my proposal carefully.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-af40c6b68133	require	rih-KWY-er	/rɪˈkwaɪ.ər/	verb	yêu cầu, đòi hỏi	The job requires three years of experience.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-b21804bc497b	provide	pruh-VYD	/prəˈvaɪd/	verb	cung cấp	The hotel provides free breakfast.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-b4a37ebf3749	avoid	uh-VOYD	/əˈvɔɪd/	verb	tránh	You should avoid too much sugar.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-bb5bed17da48	manage	MAN-ij	/ˈmæn.ɪdʒ/	verb	quản lý, xoay xở	She manages a team of ten people.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-bfc3a2246e50	prevent	prih-VENT	/prɪˈvent/	verb	ngăn ngừa	Regular exercise can prevent many illnesses.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-c3cd324ed76b	regularly	REG-yuh-ler-lee	/ˈreɡ.jə.lər.li/	adverb	một cách đều đặn	He exercises regularly every morning.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-c43e5c5e93f3	analyze	AN-uh-lyz	/ˈæn.ə.laɪz/	verb	phân tích	Researchers analyzed the survey results.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-c8c5f78d2fdf	hypothesis	hy-POTH-uh-sis	/haɪˈpɒθ.ə.sɪs/	noun	giả thuyết	The scientist tested her hypothesis in the lab.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-cd915316296d	evidence	EV-uh-duhns	/ˈev.ɪ.dəns/	noun	bằng chứng	There is strong evidence to support this theory.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-d37cea0751ee	significant	sig-NIF-i-kuhnt	/sɪɡˈnɪf.ɪ.kənt/	adjective	đáng kể, quan trọng	There was a significant improvement in her grades.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-d40d52d869fa	sufficient	suh-FISH-uhnt	/səˈfɪʃ.ənt/	adjective	đủ, đầy đủ	We don't have sufficient data yet.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-dabd67373697	furthermore	FUR-ther-mor	/ˈfɜːr.ðər.mɔːr/	adverb	hơn nữa	The plan is expensive; furthermore, it is risky.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-dfa957b2f221	assessment	uh-SES-muhnt	/əˈses.mənt/	noun	sự đánh giá	The final assessment counts for 40% of the grade.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-e028af34422e	methodology	meth-uh-DOL-uh-jee	/ˌmeθ.əˈdɒl.ə.dʒi/	noun	phương pháp luận	The paper explains its research methodology in detail.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-e65781292348	objective	uhb-JEK-tiv	/əbˈdʒek.tɪv/	noun	mục tiêu	The main objective of the study is to reduce costs.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0ae7e-7544-7297-b5c3-0c00b0703364	accountant	uh-KOWN-tuhnt	/əˈkaʊn.tənt/	noun	kế toán viên	The accountant prepared the monthly financial report.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-119d5e4399e2	agenda	uh-JEN-duh	/əˈdʒen.də/	noun	chương trình nghị sự	Please review the agenda before tomorrow's meeting.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-174012bd3d74	applicant	AP-li-kuhnt	/ˈæp.lɪ.kənt/	noun	ứng viên, người nộp đơn	Each applicant must submit a résumé by Friday.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-18118dbb05a9	authorize	AW-thuh-ryz	/ˈɔː.θə.raɪz/	verb	ủy quyền, cho phép chính thức	Only managers can authorize overtime payments.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-1f46c05d64b1	deadline	DED-lyn	/ˈded.laɪn/	noun	hạn chót	We must finish the proposal before the deadline.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-2123f89275cc	department	dih-PART-muhnt	/dɪˈpɑːrt.mənt/	noun	phòng ban	She works in the marketing department.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7544-7297-b5c3-27ea55001521	document	DOK-yuh-muhnt	/ˈdɒk.jə.mənt/	noun	tài liệu, văn bản	Please attach the signed document to your email.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0a2d1-1d9a-731b-994c-dbddbdfba368	wake up	WAYK-uhp	/weɪk ʌp/	phrasal_verb	thức dậy	I wake up at six every morning.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9b-7549-8636-74300652b918	get up	GET-uhp	/ɡet ʌp/	phrasal_verb	ra khỏi giường	She gets up early to catch the bus.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-267ede250d4c	brush	BRUHSH	/brʌʃ/	verb	đánh (răng), chải (tóc)	He brushes his teeth twice a day.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-2bf0ae9a3def	shower	SHOW-er	/ˈʃaʊ.ər/	verb	tắm vòi sen	I shower before breakfast.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-2c560c431205	breakfast	BREK-fuhst	/ˈbrek.fəst/	noun	bữa sáng	She has breakfast at seven.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-3020e486425c	commute	kuh-MYOOT	/kəˈmjuːt/	verb	đi làm/đi học hằng ngày	He commutes to work by train.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-375b2b2b42f8	routine	roo-TEEN	/ruːˈtiːn/	noun	thói quen hằng ngày	My morning routine never changes.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-3bbbff64de28	chore	CHOR	/tʃɔːr/	noun	việc vặt trong nhà	Washing dishes is my least favorite chore.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-3f9eb9f9bfe7	nap	NAP	/næp/	noun	giấc ngủ ngắn	I usually take a nap after lunch.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-4103b3ec0d2c	exhausted	ig-ZAW-stid	/ɪɡˈzɔː.stɪd/	adjective	kiệt sức	I was exhausted after the long shift.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-450ba78bdf43	errand	ER-uhnd	/ˈer.ənd/	noun	việc lặt vặt cần đi làm bên ngoài	I need to run a few errands this afternoon.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-4aa86d714378	schedule	SKED-yool	/ˈskedʒ.uːl/	noun	lịch trình	My schedule is full on Mondays.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-4c3ec6e9c545	sibling	SIB-ling	/ˈsɪb.lɪŋ/	noun	anh chị em ruột	I have two siblings, a brother and a sister.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-52790492acb7	spouse	SPOWS	/spaʊs/	noun	vợ hoặc chồng	She introduced me to her spouse.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-542a1b3f6810	relative	REL-uh-tiv	/ˈrel.ə.tɪv/	noun	người họ hàng	We invited all our relatives to the wedding.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9c-71ba-a344-59ad2d9d8afa	household	HOWS-hohld	/ˈhaʊs.hoʊld/	noun	hộ gia đình	There are four people in my household.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-3417eb212f93	neighbor	NAY-ber	/ˈneɪ.bər/	noun	hàng xóm	Our neighbor is very friendly.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-387a48d55a7d	furniture	FUR-ni-cher	/ˈfɜːr.nɪ.tʃər/	noun	đồ nội thất	We bought new furniture for the living room.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-3e101fbfdf7a	tidy	TY-dee	/ˈtaɪ.di/	adjective	gọn gàng	Please keep your room tidy.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-47c8f8c2727c	rent	RENT	/rent/	verb	thuê (nhà)	We rent a small apartment downtown.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0ae7e-7544-7297-b5c3-2887b97b2cb7	headquarters	HED-kwor-terz	/ˈhedˌkwɔːr.tərz/	noun	trụ sở chính	The company's headquarters is in Singapore.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-30a22f9751d5	memo	MEM-oh	/ˈmem.oʊ/	noun	bản ghi nhớ nội bộ	HR sent a memo about the new dress code.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-37abe0ab221c	personnel	pur-suh-NEL	/ˌpɜːr.səˈnel/	noun	nhân sự, đội ngũ nhân viên	All personnel must complete safety training.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0a2d1-1d9d-7087-8671-793a6a900848	agree	uh-GREE	/əˈɡriː/	verb	đồng ý	I agree with you completely.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0ae7e-7545-745f-95bf-39e2971bc2f6	policy	POL-uh-see	/ˈpɒl.ə.si/	noun	chính sách	The return policy allows exchanges within 30 days.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-3e60a67f77b9	procedure	pruh-SEE-jer	/prəˈsiː.dʒər/	noun	quy trình	Follow the emergency procedure posted on the wall.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-42573db3f6e9	supervise	SOO-per-vyz	/ˈsuː.pər.vaɪz/	verb	giám sát	She will supervise the new trainees this month.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0a2d1-1d9d-7087-8671-81ab42dc4a94	suggest	suhg-JEST	/səɡˈdʒest/	verb	đề nghị, gợi ý	I suggest we leave early tomorrow.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-8495925c117a	assume	uh-SOOM	/əˈsuːm/	verb	cho rằng, giả định	I assumed you already knew the news.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-8b9a20839eba	curious	KYOOR-ee-uhs	/ˈkjʊr.i.əs/	adjective	tò mò	She was curious about his new job.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-8ee7bb203cf3	nervous	NUR-vuhs	/ˈnɜːr.vəs/	adjective	lo lắng, hồi hộp	I always feel nervous before an interview.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-5627d1271604	leftover	LEFT-oh-ver	/ˈleft.oʊ.vər/	noun	đồ ăn thừa	We had the leftovers for dinner.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-58341d55d564	flavor	FLAY-ver	/ˈfleɪ.vər/	noun	hương vị	This ice cream has a strong chocolate flavor.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-5e6df3573bd9	appetite	AP-uh-tyt	/ˈæp.ə.taɪt/	noun	khẩu vị, cảm giác thèm ăn	Exercise gives me a big appetite.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-62b2b27b9113	grocery	GROH-suh-ree	/ˈɡroʊ.sər.i/	noun	hàng tạp hóa	I need to buy some groceries after work.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-6493260e0a1e	beverage	BEV-rij	/ˈbev.rɪdʒ/	noun	đồ uống	The menu offers a variety of beverages.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-6912503ba560	reservation	rez-er-VAY-shuhn	/ˌrez.ərˈveɪ.ʃən/	noun	sự đặt chỗ (nhà hàng, khách sạn)	I made a reservation for two at eight.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-6c7080ddabc4	delicious	dih-LISH-uhs	/dɪˈlɪʃ.əs/	adjective	ngon	This cake is absolutely delicious.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-709550cabec2	spicy	SPY-see	/ˈspaɪ.si/	adjective	cay	Vietnamese food can be quite spicy.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-7585a34191e5	opinion	uh-PIN-yuhn	/əˈpɪn.jən/	noun	ý kiến	In my opinion, this book is excellent.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-7c625ce12029	disagree	dis-uh-GREE	/ˌdɪs.əˈɡriː/	verb	không đồng ý	I'm afraid I disagree with that plan.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-9012364e42dd	confident	KON-fi-duhnt	/ˈkɒn.fɪ.dənt/	adjective	tự tin	She spoke confidently in front of the class.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-968b308dad44	embarrassed	im-BAR-uhst	/ɪmˈbær.əst/	adjective	xấu hổ, ngượng	He felt embarrassed after forgetting her name.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-9a64f21aec85	relieved	rih-LEEVD	/rɪˈliːvd/	adjective	nhẹ nhõm	I was relieved to hear the good news.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-9c14d1236225	frustrated	FRUHS-tray-tid	/ˈfrʌs.treɪ.tɪd/	adjective	bực bội, thất vọng	He got frustrated when the internet stopped working.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-a1f11a2fe18c	apologize	uh-POL-uh-jyz	/əˈpɒl.ə.dʒaɪz/	verb	xin lỗi	I want to apologize for being late.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-a51f11d4364b	compliment	KOM-pli-muhnt	/ˈkɒm.plɪ.mənt/	noun	lời khen	Thank you for the compliment.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-a99657868a25	interrupt	in-tuh-RUHPT	/ˌɪn.təˈrʌpt/	verb	ngắt lời, làm gián đoạn	Sorry to interrupt, but you have a phone call.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-adc93abe3498	mention	MEN-shuhn	/ˈmen.ʃən/	verb	đề cập tới	She mentioned that she might move to Hanoi.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-b152b70235df	itinerary	eye-TIN-uh-rer-ee	/aɪˈtɪn.ə.rer.i/	noun	lịch trình du lịch	Our itinerary includes three cities.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-b52b0a54f07d	luggage	LUHG-ij	/ˈlʌɡ.ɪdʒ/	noun	hành lý	Please keep your luggage with you at all times.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-b99e961fb659	boarding pass	BOR-ding pas	/ˈbɔːr.dɪŋ pæs/	noun	thẻ lên máy bay	Show your boarding pass at the gate.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-331eab7b929c	outcome	OWT-kuhm	/ˈaʊt.kʌm/	noun	kết quả	The outcome of the experiment was unexpected.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0ae7e-754d-73ff-ab6f-fc9833c118aa	deposit	dih-POZ-it	/dɪˈpɒz.ɪt/	noun	tiền đặt cọc	A 20% deposit is required to reserve the venue.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-02990f0bb055	discount	DIS-kownt	/ˈdɪs.kaʊnt/	noun	giảm giá	Members receive a 15% discount on all orders.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ad29-1bc2-73db-a221-c12335764762	racehorse	reɪsˌhɔːrs	reɪsˌhɔːrs	noun	ngựa đua	Now much of the non-arable down land is only preserved in its open state as racehorse gallops in the area.	\N	medium	2026-09-17 02:19:07.593788+00	2026-09-17 02:19:07.593788+00	t	01a0a3b9-7821-7357-9b65-af7f4ca1999b	\N	\N
01a0a2d1-1d9d-7087-8671-c0ef25d2695e	departure	dih-PAR-cher	/dɪˈpɑːr.tʃər/	noun	sự khởi hành	The departure time is 9 a.m.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-c7a23fcba4c7	arrival	uh-RY-vuhl	/əˈraɪ.vəl/	noun	sự đến nơi	Check the arrival board for your flight.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9d-7087-8671-c86c6b925f7c	accommodation	uh-kom-uh-DAY-shuhn	/əˌkɒm.əˈdeɪ.ʃən/	noun	chỗ ở	We booked our accommodation online.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-5fc140dddebc	vacancy	VAY-kuhn-see	/ˈveɪ.kən.si/	noun	phòng trống (khách sạn)	The hotel has no vacancy this weekend.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-60c9ab002603	checkout	CHEK-owt	/ˈtʃek.aʊt/	noun	trả phòng	Checkout time is noon.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-664430bb8d9d	currency	KUR-uhn-see	/ˈkɜːr.ən.si/	noun	tiền tệ	I need to exchange my currency.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-69452b4f7c12	fare	FAIR	/fer/	noun	giá vé	The bus fare is two dollars.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-6d0ba63effe2	platform	PLAT-form	/ˈplæt.fɔːrm/	noun	sân ga, sân ke	The train leaves from platform 4.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-71e141f2ed72	souvenir	soo-vuh-NEER	/ˌsuː.vəˈnɪr/	noun	quà lưu niệm	I bought a souvenir for my sister.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-76fc13f46af7	landmark	LAND-mark	/ˈlænd.mɑːrk/	noun	địa danh, mốc nổi tiếng	The Eiffel Tower is a famous landmark.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-798dfd0565d2	delay	dih-LAY	/dɪˈleɪ/	noun	sự trì hoãn	Our flight had a two-hour delay.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-7e9e6550ca5f	detour	DEE-toor	/ˈdiː.tʊr/	noun	đường vòng	We took a detour to avoid traffic.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-80b96ebff2dc	roundtrip	ROWND-trip	/ˈraʊnd.trɪp/	noun	vé khứ hồi	A roundtrip ticket is cheaper than two one-way tickets.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-87e05e5461d9	improve	im-PROOV	/ɪmˈpruːv/	verb	cải thiện	She wants to improve her English.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-8ae10390850f	achieve	uh-CHEEV	/əˈtʃiːv/	verb	đạt được	He achieved his goal of running a marathon.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-8ef79cd7ffd4	although	awl-THOH	/ɔːlˈðoʊ/	conjunction	mặc dù	Although it was raining, we went for a walk.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-93043459bf9b	however	how-EV-er	/haʊˈev.ər/	adverb	tuy nhiên	The plan sounded good; however, it was too expensive.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-97f3a0e1cb58	therefore	THAIR-for	/ˈðer.fɔːr/	adverb	vì vậy	It was late; therefore, we took a taxi home.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-986be2a023a7	unless	uhn-LES	/ənˈles/	conjunction	trừ khi	I won't go unless you come with me.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-9c9c46a6b896	despite	dih-SPYT	/dɪˈspaɪt/	preposition	mặc dù (bất chấp)	Despite the rain, the match continued.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-34f7ee7d3ec9	contradict	kon-truh-DIKT	/ˌkɒn.trəˈdɪkt/	verb	mâu thuẫn với	His second statement contradicts the first.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9e-7539-bba7-a3517601b08c	increase	in-KREES	/ɪnˈkriːs/	verb	tăng lên	Prices increased last month.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-3aa402909293	emphasize	EM-fuh-syz	/ˈem.fə.saɪz/	verb	nhấn mạnh	The teacher emphasized the importance of practice.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-3fbdadffbeaa	controversial	kon-truh-VUR-shuhl	/ˌkɒn.trəˈvɜːr.ʃəl/	adjective	gây tranh cãi	It was a controversial decision.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-405d8a5840e1	criteria	kry-TEER-ee-uh	/kraɪˈtɪr.i.ə/	noun	tiêu chí	The criteria for the award are strict.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-467da12b4976	conclude	kuhn-KLOOD	/kənˈkluːd/	verb	kết luận	The report concludes that more funding is needed.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-49060289f0ee	borrow	BOR-oh	/ˈbɒr.oʊ/	verb	mượn	Can I borrow your pen?	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-4e82f5c1a091	lend	LEND	/lend/	verb	cho mượn	Could you lend me some money?	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-53b299ac3992	return	rih-TURN	/rɪˈtɜːrn/	verb	trả lại, quay về	Please return the book by Friday.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-547ed1ca8899	apologetic	uh-pol-uh-JET-ik	/əˌpɒl.əˈdʒet.ɪk/	adjective	hối lỗi, áy náy	He was apologetic about the mistake.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-5bc2c642dab0	punctual	PUHNGK-choo-uhl	/ˈpʌŋk.tʃu.əl/	adjective	đúng giờ	She is always punctual for meetings.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-5db70a2a71ed	convenient	kuhn-VEEN-yuhnt	/kənˈviːn.jənt/	adjective	thuận tiện	Is it convenient for you to meet at 3 p.m.?	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-606c680948cd	reliable	rih-LY-uh-buhl	/rɪˈlaɪ.ə.bəl/	adjective	đáng tin cậy	He's a reliable friend.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-65850459b9c4	generous	JEN-er-uhs	/ˈdʒen.ər.əs/	adjective	hào phóng	It was generous of you to help.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-6b01ba7eb3ba	polite	puh-LYT	/pəˈlaɪt/	adjective	lịch sự	It's polite to say thank you.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-6d6bbaf51fa7	rude	ROOD	/ruːd/	adjective	thô lỗ	It was rude of him to interrupt.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-736a17082b92	encourage	in-KUR-ij	/ɪnˈkɜːr.ɪdʒ/	verb	khuyến khích	My teacher encouraged me to keep practicing.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-7737e7523e5a	discourage	dis-KUR-ij	/dɪsˈkɜːr.ɪdʒ/	verb	làm nản lòng	Don't let one failure discourage you.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-7815de00584e	afford	uh-FORD	/əˈfɔːrd/	verb	có đủ khả năng (tiền, thời gian)	We can't afford a new car this year.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-7f8f067336c8	budget	BUHJ-it	/ˈbʌdʒ.ɪt/	noun	ngân sách	We need to stick to our budget.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-83f794e954f3	purchase	PUR-chuhs	/ˈpɜːr.tʃəs/	verb	mua	She purchased a new laptop.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-862c32b1b1e6	refund	REE-fuhnd	/ˈriː.fʌnd/	noun	khoản hoàn tiền	I asked for a refund on the broken item.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-8a5a7e5269d6	receipt	rih-SEET	/rɪˈsiːt/	noun	hóa đơn, biên lai	Keep your receipt in case you need to return it.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-8c0dbcc5c328	appointment	uh-POYNT-muhnt	/əˈpɔɪnt.mənt/	noun	cuộc hẹn	I have a doctor's appointment tomorrow.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-924e86470b8e	postpone	pohst-POHN	/poʊstˈpoʊn/	verb	hoãn lại	We had to postpone the meeting.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-97b7d0ef6742	cancel	KAN-suhl	/ˈkæn.səl/	verb	hủy bỏ	The flight was canceled due to weather.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-9a972f2582bb	confirm	kuhn-FURM	/kənˈfɜːrm/	verb	xác nhận	Please confirm your reservation by email.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-9e637cdfb927	opportunity	op-er-TOO-ni-tee	/ˌɒp.əˈtuː.nə.ti/	noun	cơ hội	This job is a great opportunity for her.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-a1ea4f5483ff	challenge	CHAL-inj	/ˈtʃæl.ɪndʒ/	noun	thử thách	Learning a new language is a big challenge.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-a41444ed9ec2	solution	suh-LOO-shuhn	/səˈluː.ʃən/	noun	giải pháp	We need to find a solution quickly.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-a8b661ca5657	advantage	uhd-VAN-tij	/ədˈvæn.tɪdʒ/	noun	lợi thế	Speaking two languages is a big advantage.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-ac81c0688fba	disadvantage	dis-uhd-VAN-tij	/ˌdɪs.ədˈvæn.tɪdʒ/	noun	bất lợi	One disadvantage of the plan is the cost.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-b2629a9c1455	similar	SIM-uh-ler	/ˈsɪm.ə.lər/	adjective	tương tự	These two dresses look similar.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1d9f-76cd-bdf6-b75f228e5b1c	unique	yoo-NEEK	/juˈniːk/	adjective	độc đáo, duy nhất	Every snowflake is unique.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-af8931bf2474	explore	ik-SPLOR	/ɪkˈsplɔːr/	verb	khám phá	We spent the weekend exploring the old town.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-b06d4737daed	discover	dih-SKUHV-er	/dɪˈskʌv.ər/	verb	khám phá ra, phát hiện	Scientists discovered a new species of frog.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-b79e4dfb8574	success	SUHK-ses	/səkˈses/	noun	sự thành công	Hard work is the key to success.	\N	easy	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-b9682ef054e8	failure	FAYL-yer	/ˈfeɪl.jər/	noun	sự thất bại	He learned a lot from that failure.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-bf7861fb7589	ambitious	am-BISH-uhs	/æmˈbɪʃ.əs/	adjective	tham vọng, có chí lớn	She is ambitious and works very hard.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-c26a743392cf	patient	PAY-shuhnt	/ˈpeɪ.ʃənt/	adjective	kiên nhẫn	You need to be patient with beginners.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-c466feadbf12	flexible	FLEK-suh-buhl	/ˈflek.sə.bəl/	adjective	linh hoạt	My work schedule is quite flexible.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-c9b5e36fe18d	independent	in-dih-PEN-duhnt	/ˌɪn.dɪˈpen.dənt/	adjective	độc lập	She became independent after moving abroad.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-ce75cad58774	responsible	rih-SPON-suh-buhl	/rɪˈspɒn.sə.bəl/	adjective	có trách nhiệm	He is responsible for the whole project.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-d14743b6f111	efficient	ih-FISH-uhnt	/ɪˈfɪʃ.ənt/	adjective	hiệu quả	The new system is much more efficient.	\N	hard	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0a2d1-1da0-76eb-8153-d71aff750357	accurate	AK-yer-it	/ˈæk.jər.ət/	adjective	chính xác	Please give me an accurate estimate.	\N	medium	2026-09-15 02:06:48.804079+00	2026-09-17 09:53:16.517+00	f	\N	\N	\N
01a0ae7e-7545-745f-95bf-464ef6794f07	submit	suhb-MIT	/səbˈmɪt/	verb	nộp, gửi (hồ sơ, báo cáo)	Please submit your timesheet every Friday.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-4a7d66faca1a	update	UP-dayt	/ʌpˈdeɪt/	verb	cập nhật	Could you update the client list this afternoon?	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	office
01a0ae7e-7545-745f-95bf-4d77abe06b46	benefits	BEN-uh-fits	/ˈben.ɪ.fɪts/	noun	phúc lợi (nhân viên)	Health insurance is one of our employee benefits.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-518c19a868b5	candidate	KAN-di-duht	/ˈkæn.dɪ.dət/	noun	ứng viên	We interviewed three candidates for the role.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-551e8fc72eb9	colleague	KOL-eeg	/ˈkɒl.iːɡ/	noun	đồng nghiệp	My colleague helped me finish the report.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-5be5f9522c85	credentials	kri-DEN-shuhlz	/krɪˈden.ʃəlz/	noun	bằng cấp, chứng chỉ chuyên môn	Please bring copies of your credentials to the interview.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-5dae1501ee6c	hire	HYR	/haɪər/	verb	tuyển dụng	The firm plans to hire five more engineers.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-62e802cecb53	interview	IN-ter-vyoo	/ˈɪn.tə.vjuː/	noun	buổi phỏng vấn	Her job interview is scheduled for Monday morning.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-64c85e9851d8	overtime	OH-ver-tym	/ˈoʊ.vər.taɪm/	noun	giờ làm thêm	Staff may request overtime during the busy season.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-6aea04494b4a	payroll	PAY-rohl	/ˈpeɪ.roʊl/	noun	bảng lương; bộ phận tính lương	Payroll processes salaries on the last day of each month.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7545-745f-95bf-6dc027d1d53a	promote	pruh-MOHT	/prəˈmoʊt/	verb	thăng chức; đẩy mạnh	The company will promote two team leads next quarter.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-b1902a552838	qualify	KWOL-uh-fy	/ˈkwɒl.ɪ.faɪ/	verb	đủ điều kiện, đạt chuẩn	You must qualify before applying for the senior role.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-b60c6500b711	recruit	rih-KROOT	/rɪˈkruːt/	verb	tuyển mộ, thu hút nhân sự	We need to recruit bilingual customer-service staff.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-bb6bd45ea7b5	resign	rih-ZYN	/rɪˈzaɪn/	verb	từ chức	He decided to resign after five years at the firm.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-bcf1d8fb9098	salary	SAL-uh-ree	/ˈsæl.ə.ri/	noun	lương tháng	The starting salary includes a performance bonus.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-c3759a742097	staff	STAF	/stæf/	noun	nhân viên (tập thể)	All staff must attend the fire drill.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-c4660f4ceb1d	trainee	tray-NEE	/ˌtreɪˈniː/	noun	thực tập sinh, người đang được đào tạo	Each trainee is paired with an experienced mentor.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	hr
01a0ae7e-7546-72e7-82c5-ca97a8ac4300	bargain	BAR-guhn	/ˈbɑːr.ɡən/	noun	món hời; thỏa thuận giá	Those office chairs were a real bargain.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-7546-72e7-82c5-ced0b6ce01f9	client	KLY-uhnt	/ˈklaɪ.ənt/	noun	khách hàng (doanh nghiệp)	Our biggest client renewed the contract today.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-7546-72e7-82c5-d2090804aaf4	commission	kuh-MISH-uhn	/kəˈmɪʃ.ən/	noun	hoa hồng	Sales reps earn a 10% commission on each deal.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-7546-72e7-82c5-d4f02310260e	competitor	kuhm-PET-ih-ter	/kəmˈpet.ɪ.tər/	noun	đối thủ cạnh tranh	A new competitor opened a store downtown.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-7546-72e7-82c5-d8387e8ea05e	contract	KON-trakt	/ˈkɒn.trækt/	noun	hợp đồng	Please read the contract carefully before signing.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754e-75f9-b800-fa1e22c7c1d2	attend	uh-TEND	/əˈtend/	verb	tham dự	All managers must attend the quarterly review.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754e-75f9-b800-fd816ce8d240	conference	KON-fer-uhns	/ˈkɒn.fər.əns/	noun	hội nghị	She presented our results at an industry conference.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-d2c6a8069d22	notify	NOH-ti-fy	/ˈnoʊ.tɪ.faɪ/	verb	thông báo	Please notify IT if you change your password.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-d6c35b313a97	request	rih-KWEST	/rɪˈkwest/	verb	yêu cầu	You can request a meeting through the portal.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-db8bcb064e0b	survey	SER-vay	/ˈsɜːr.veɪ/	noun	khảo sát	Please complete the customer satisfaction survey.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-de18dab00aaa	tentative	TEN-tuh-tiv	/ˈten.tə.tɪv/	adjective	tạm thời, chưa chắc chắn	We set a tentative date for the product demo.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-e2f2f6e0e14c	transfer	trans-FUR	/trænsˈfɜːr/	verb	chuyển (người, tiền, dữ liệu)	HR will transfer her to the Seoul office next month.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-e426d2ebe445	available	uh-VAY-luh-buhl	/əˈveɪ.lə.bəl/	adjective	có sẵn; rảnh	Is the meeting room available at 3 p.m.?	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-e9bef6f14934	expand	ik-SPAND	/ɪkˈspænd/	verb	mở rộng	The chain plans to expand into three new cities.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0ae7e-754f-724a-b341-ec0ede85bf5c	figure	FIG-yer	/ˈfɪɡ.jər/	noun	con số (thống kê)	Sales figures improved after the campaign.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	meetings
01a0aec8-e772-76c3-8d73-90ade452fd96	mister	MꞮSTɝ	/ˈmɪstɝ/	noun	một hình thức địa chỉ cho một người đàn ông	Please check the mister before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e772-76c3-8d73-95e0db42b251	vacation	VEꞮ-keɪʃən	/veɪˈkeɪʃən/	noun	một kỳ nghỉ hoặc nghỉ giải lao khỏi công việc	Please check the vacation before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e772-76c3-8d73-9b0fbca341bf	airport	ƐƏ-pɔ-t	/ˈɛə.pɔːt/	noun	nơi bạn đến để lên máy bay	Please check the airport before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e778-773d-ab2d-50751c41c053	logical	ⱢⱭDƷꞮKƏⱢ	/ˈɫɑdʒɪkəɫ/	adjective	liên quan đến lý do	This is a logical solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e779-75be-8bc7-5ef86b44e47f	fax	FÆKS	/ˈfæks/	noun	để gửi bằng máy fax	Please check the fax before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e779-75be-8bc7-611382aff956	o'clock	Ə-kɫɑk	/əˈkɫɑk/	noun	giờ trong ngày	Please check the o'clock before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e779-75be-8bc7-6593d0f0ddc3	sincerely	SꞮN-sɪɹɫi	/sɪnˈsɪɹɫi/	adverb	<g id="173">• </g>với sự trung thực;	She responded sincerely to the client's request.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0ae7e-754d-73ff-ab70-0798f7deac2e	estimate	ES-ti-muht	/ˈes.tɪ.mət/	noun	báo giá ước tính	The contractor sent an estimate for the renovation.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-0a7c9acb720d	expense	ik-SPENS	/ɪkˈspens/	noun	chi phí	Travel expenses must be approved in advance.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-0d8dd47d6da8	forecast	FOR-kast	/ˈfɔːr.kæst/	noun	dự báo	The sales forecast looks strong for next quarter.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-12322f835521	invoice	IN-voys	/ˈɪn.vɔɪs/	noun	hóa đơn thanh toán	Please pay the invoice within 14 days.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-16a7499bbea2	negotiate	nih-GOH-shee-ayt	/nɪˈɡoʊ.ʃi.eɪt/	verb	đàm phán	We will negotiate the price with the supplier.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-1813cf8ceacd	quote	KWOHT	/kwoʊt/	noun	báo giá	Can you send me a quote for 500 units?	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-1faf221ec17c	retail	REE-tayl	/ˈriː.teɪl/	noun	bán lẻ	She has ten years of experience in retail.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754d-73ff-ab70-23773376d61d	revenue	REV-uh-noo	/ˈrev.ə.njuː/	noun	doanh thu	Annual revenue rose by 8% last year.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754e-75f9-b800-b4a35e8b917e	warranty	WOR-uhn-tee	/ˈwɒr.ən.ti/	noun	bảo hành	The laptop comes with a two-year warranty.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754e-75f9-b800-bbd2bb4ecd24	withdraw	with-DRAW	/wɪðˈdrɔː/	verb	rút (tiền); rút lại	You can withdraw cash from any branch ATM.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	sales
01a0ae7e-754e-75f9-b800-bf1383fefb68	assemble	uh-SEM-buhl	/əˈsem.bəl/	verb	lắp ráp; tập hợp	Workers assemble the devices on the production line.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0aec8-e779-75be-8bc7-694ecdb8541e	sometime	SƏM-taɪm	/ˈsəmˌtaɪm/	noun	tại một thời điểm không xác định	Please check the sometime before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e779-75be-8bc7-6eea10645cb3	supervisor	SUPɝ-vaɪzɝ	/ˈsupɝˌvaɪzɝ/	noun	người phụ trách	Please check the supervisor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e779-75be-8bc7-726a48d26c02	goods	ꞬƱDZ	/ˈɡʊdz/	noun	tài nguyên hoặc những thứ được mua hoặc bán	Please check the goods before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e779-75be-8bc7-74b0319646a4	workshop	WɝK-ʃɑp	/ˈwɝkˌʃɑp/	noun	một tòa nhà hoặc phòng nơi mọi thứ được tạo ra hoặc sửa chữa	Please check the workshop before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e779-75be-8bc7-787265d48d2a	downtown	DAƱN-taʊn	/ˈdaʊnˈtaʊn/	noun	doanh nghiệp hoặc khu vực trung tâm của một thành phố hoặc thị trấn	Please check the downtown before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edc-f48c8e877500	brochure	BɹOƱ-ʃʊɹ	/bɹoʊˈʃʊɹ/	noun	một cuốn sách giấy nhỏ cung cấp thông tin về một sản phẩm hoặc dịch vụ	Please check the brochure before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edc-f8c7687a776c	noon	NUN	/ˈnun/	noun	Giữa ban ngày à?	Please check the noon before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edc-fedebf4d2794	clerk	KⱢɝK	/ˈkɫɝk/	noun	một người làm việc tại quầy	Please check the clerk before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e77a-7620-9edd-00c16a83eb52	lobby	ⱢⱭBI	/ˈɫɑbi/	noun	khu vực chính của một khách sạn ngay bên trong lối vào	Please check the lobby before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edd-0598e7f2cf20	publish	PƏBⱢꞮƩ	/ˈpəbɫɪʃ/	noun	để in và phân phối	Please check the publish before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e77a-7620-9edd-09c57d31f3ea	enclose	ꞮN-kɫoʊz	/ɪnˈkɫoʊz/	noun	để bao quanh toàn bộ	Please check the enclose before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edd-0cb8d2e9658d	seminar	SƐMƏ-nɑɹ	/ˈsɛməˌnɑɹ/	noun	một buổi thảo luận hoặc lớp học do giáo viên hoặc chuyên gia dẫn dắt	Please check the seminar before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e77a-7620-9edd-12edf2334328	technician	TƐK-nɪʃən	/tɛkˈnɪʃən/	noun	một người được đào tạo các kỹ năng đặc biệt để làm công việc thực tế	Please check the technician before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77a-7620-9edd-17239bf195b1	cloth	KⱢƆΘ	/ˈkɫɔθ/	noun	một miếng vật liệu mỏng	Please check the cloth before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-2dcb18e4697a	traveler	TɹÆVƏⱢɝ	/ˈtɹævəɫɝ/	noun	một khách du lịch hoặc nhà thám hiểm đến thăm nhiều quốc gia	Please check the traveler before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-31045c580c1c	caller	KƆⱢɝ	/ˈkɔɫɝ/	noun	người đang gọi điện cho bạn	Please check the caller before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0ae7e-754e-75f9-b800-c259a4aad69c	deliver	dih-LIV-er	/dɪˈlɪv.ər/	verb	giao hàng	We deliver orders within three business days.	\N	easy	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-c4cb6cc06698	distribute	dih-STRIB-yoot	/dɪˈstrɪb.juːt/	verb	phân phối	The warehouse distributes goods to regional stores.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-c91bf59ba922	facility	fuh-SIL-uh-tee	/fəˈsɪl.ə.ti/	noun	cơ sở, nhà xưởng/tiện ích	The new factory is a state-of-the-art facility.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-cf33daf23305	freight	FRAYT	/freɪt/	noun	hàng hóa vận chuyển; cước vận tải	Freight costs increased due to higher fuel prices.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-d38e8fc6c14f	inventory	IN-vuhn-tor-ee	/ˈɪn.vən.tɔːr.i/	noun	hàng tồn kho	We need to check the inventory before restocking.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-d41d6ed20734	launch	LAWNCH	/lɔːntʃ/	verb	ra mắt (sản phẩm)	The company will launch the new app in June.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-db3aabe15e93	maintain	mayn-TAYN	/meɪnˈteɪn/	verb	duy trì, bảo trì	Technicians maintain the machines every week.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-de196523cb04	manufacture	man-yuh-FAK-cher	/ˌmæn.jəˈfæk.tʃər/	verb	sản xuất (công nghiệp)	The plant manufactures electronic components.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-e017c3b5c976	merchandise	MUR-chuhn-dys	/ˈmɜːr.tʃən.daɪs/	noun	hàng hóa (để bán)	Damaged merchandise cannot be returned to shelves.	\N	hard	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-e40c6f39cdc2	occupy	OK-yuh-py	/ˈɒk.jə.paɪ/	verb	chiếm dụng, sử dụng (không gian)	The new team will occupy the third-floor offices.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-eb8e56735fc4	operate	OP-uh-rayt	/ˈɒp.ə.reɪt/	verb	vận hành, điều hành	Only trained staff may operate this equipment.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-ed21a4a42a87	shipment	SHIP-muhnt	/ˈʃɪp.mənt/	noun	lô hàng	The shipment arrived two days earlier than expected.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-f14220a19ed3	supplier	suh-PLY-er	/səˈplaɪ.ər/	noun	nhà cung cấp	We switched to a local supplier to cut costs.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0ae7e-754e-75f9-b800-f600188abfb5	warehouse	WAIR-hows	/ˈweər.haʊs/	noun	kho hàng	Extra stock is stored in the west warehouse.	\N	medium	2026-09-17 08:31:58.336973+00	2026-09-17 09:53:17.164+00	f	\N	toeic	logistics
01a0aec8-e77b-705c-98d2-353c30a951ef	subway	SƏB-weɪ	/ˈsəbˌweɪ/	noun	một đường hầm dưới lòng đường để mọi người đi bộ qua	Please check the subway before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-3a7f18792342	infer	ꞮN-fɝ	/ˌɪnˈfɝ/	noun	đoán một cái gì đó với thông tin nhất định	Please check the infer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-3f294c7a1fc7	waiter	WEꞮTɝ	/ˈweɪtɝ/	noun	một người đàn ông có nhiệm vụ mang bữa ăn đến bàn của bạn trong nhà hàng hoặc quán cà phê	Please check the waiter before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-406f6d966661	rental	ɹƐNTƏⱢ	/ˈɹɛntəɫ/	adjective	hành động trả tiền cho việc sử dụng một cái gì đó (như một căn hộ hoặc nhà hoặc xe hơi)	This is a rental solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e77b-705c-98d2-47c5809dd187	cafeteria	KÆFƏ-tɪɹiə	/ˌkæfəˈtɪɹiə/	noun	một nhà hàng nơi bạn tự phục vụ và trả tiền cho nhân viên thu ngân	Please check the cafeteria before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e77b-705c-98d2-48ffc75f7cc8	chef	ƩƐF	/ˈʃɛf/	noun	một người nấu ăn để kiếm sống	Please check the chef before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77b-705c-98d2-4fee84667ddf	elevator	ƐⱢƏ-veɪtɝ	/ˈɛɫəˌveɪtɝ/	noun	một cỗ máy đưa mọi người đến các tầng khác nhau trong một tòa nhà	Please check the elevator before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a3f-fb103a8e9da6	reception	ɹI-sɛpʃən	/ɹiˈsɛpʃən/	noun	hành động chào hỏi mọi người	Please check the reception before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a3f-fd38a46ac5fe	correctly	Kɝ-ɛktɫi	/kɝˈɛktɫi/	adverb	làm điều gì đó đúng cách	She responded correctly to the client's request.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-020f1998f8e3	lease	ⱢIS	/ˈɫis/	noun	cho thuê	Please check the lease before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-07ecb554f4ad	bicycle	BAꞮSꞮKƏⱢ	/ˈbaɪsɪkəɫ/	noun	một chiếc xe có hai bánh và bàn đạp	Please check the bicycle before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-086941175d43	preview	PɹIV-ju	/ˈpɹivˌju/	noun	một cơ hội để xem một cái gì đó trước khi nó trở nên phổ biến	Please check the preview before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-0d51a5035d48	attendant	Ə-tɛndənt	/əˈtɛndənt/	adjective	một người chờ đợi hoặc có xu hướng đáp ứng nhu cầu của người khác	This is a attendant solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e77c-7671-8a40-1048c817da41	subscription	SƏBS-kɹɪpʃən	/səbsˈkɹɪpʃən/	noun	số tiền mà bạn phải trả để nhận dịch vụ hoặc sản phẩm thường xuyên	Please check the subscription before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e77c-7671-8a40-14b14512682a	manual	MÆNJUƏⱢ	/ˈmænjuəɫ/	adjective	một cuốn sách giải thích cách làm điều gì đó	This is a manual solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-199ef6a6d8e4	clue	KⱢU	/ˈkɫu/	noun	một gợi ý, một mẹo	Please check the clue before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77c-7671-8a40-1e6153b39332	garage	Ɡɝ-ɑʒ	/ɡɝˈɑʒ/	noun	nơi bạn cất xe	Please check the garage before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-b7f9f7306ff7	obtain	ƏB-teɪn	/əbˈteɪn/	verb	để có được	They decided to obtain the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-bbcad31217e8	oval	OƱVƏⱢ	/ˈoʊvəɫ/	adjective	Một hình dạng trông giống như một quả trứng	This is a oval solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-bf23c72102d9	outdoor	AƱT-dɔɹ	/ˈaʊtˌdɔɹ/	noun	bên ngoài trong không khí thoáng đãng	Please check the outdoor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-c0e3ec406858	suitcase	SUT-keɪs	/ˈsutˌkeɪs/	noun	Một chiếc túi lớn như hộp đựng để đựng quần áo khi đi du lịch	Please check the suitcase before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-c77ded2c1965	destination	DƐSTƏ-neɪʃən	/ˌdɛstəˈneɪʃən/	noun	nơi bạn muốn đến vào cuối cuộc hành trình	Please check the destination before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-c8527c931041	occupation	ⱭKJƏ-peɪʃən	/ˌɑkjəˈpeɪʃən/	noun	nghề nghiệp hoặc công việc	Please check the occupation before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-cf095140d126	umbrella	ƏM-bɹɛɫə	/ˈəmˌbɹɛɫə/	noun	một cái gì đó, giống như một tổ chức, bao gồm một phạm vi tương tự	Please check the umbrella before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-d0f5745d031d	inference	ꞮNFɝƏNS	/ˈɪnfɝəns/	noun	hành động đoán một cái gì đó với thông tin nhất định	Please check the inference before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-d63a47e7e86f	cellphone	SƐⱢFOƱN	/ˈsɛɫfoʊn/	noun	điện thoại kết nối với hệ thống bằng radio để bạn có thể sử dụng nó ở bất cứ đâu	Please check the cellphone before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-dadbf70e2ab7	compact	KⱭMPÆKT	/ˈkɑmpækt/	noun	được đóng gói chặt chẽ với kích thước nhỏ	Please check the compact before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-deed1c16b38f	receptionist	ɹI-sɛpʃənɪst	/ɹiˈsɛpʃənɪst/	noun	một người làm việc tại quầy lễ tân, ví dụ như thư ký	Please check the receptionist before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e77d-7207-8ea2-e352a62ba8db	dentist	DƐNꞮST	/ˈdɛnɪst/	noun	một người chăm sóc răng của bạn để kiếm sống	Please check the dentist before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77d-7207-8ea2-e64630634118	identification	AꞮ-dɛntəfə-keɪʃən	/aɪˌdɛntəfəˈkeɪʃən/	noun	một tài liệu cho biết một người là ai, ví dụ: hộ chiếu, bằng lái xe	Please check the identification before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e77e-713c-905c-0f0bef44fde3	coupon	KJU-pɔn	/ˈkjuˌpɔn/	noun	một mảnh giấy mà bạn có thể sử dụng để mua hàng hóa hoặc để có được chúng với giá giảm	Please check the coupon before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e77e-713c-905c-13c0d6962bad	depart	DꞮ-pɑɹt	/dɪˈpɑɹt/	noun	Bỏ đi.	Please check the depart before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-14296f393249	reschedule	ɹI-skɛdʒuɫ	/ɹiˈskɛdʒuɫ/	noun	để thiết lập một thời gian mới cho một cái gì đó	Please check the reschedule before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-19edac8dd700	tactic	TÆKTꞮK	/ˈtæktɪk/	noun	như một kế hoạch hoặc kế hoạch	Please check the tactic before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-1f774e9b7c49	renovation	ɹƐNƏ-veɪʃən	/ˌɹɛnəˈveɪʃən/	noun	quá trình khôi phục lại tình trạng trước đó hoặc tốt hơn	Please check the renovation before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-231c26dc9b08	upgrade	ƏP-ɡɹeɪd	/ˈəpˈɡɹeɪd/	noun	để cải thiện những gì đã cũ hoặc lỗi thời	Please check the upgrade before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-24355960c54e	precede	PɹꞮ-sid	/pɹɪˈsid/	noun	xảy ra trước khi có điều gì khác	Please check the precede before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e77e-713c-905c-288b83a42b89	replacement	ɹꞮ-pɫeɪsmənt	/ɹɪˈpɫeɪsmənt/	noun	đặt cái gì/ai đó vào vị trí của cái gì/ai đó khác	Please check the replacement before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e785-745e-94e6-fbdeb9b6de8c	dine	DAꞮN	/ˈdaɪn/	noun	ăn tối; ăn tối	Please check the dine before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e785-745e-94e6-ffedd8c0f29d	passport	PÆS-pɔɹt	/ˈpæsˌpɔɹt/	noun	giấy tờ chính thức có chứa thông tin về bạn, cho phép bạn nhập cảnh vào các quốc gia khác	Please check the passport before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e785-745e-94e7-00c2a448a4b8	coworker	KOƱ-wɝkɝ	/ˈkoʊˈwɝkɝ/	noun	một người làm việc với bạn tại cùng một nơi làm việc	Please check the coworker before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e785-745e-94e7-0727d233824a	upcoming	ƏP-kəmɪŋ	/ˈəpˌkəmɪŋ/	verb	sẽ sớm diễn ra	They decided to upcoming the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e785-745e-94e7-0800348ff629	cabinet	KÆBƏNƏT	/ˈkæbənət/	noun	một món đồ nội thất có kệ để cất đồ	Please check the cabinet before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-83d7c28ff13f	explanatory	ꞮKS-pɫænə-tɔɹi	/ɪksˈpɫænəˌtɔɹi/	noun	để giải thích hoặc làm rõ	Please check the explanatory before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-87e03b9e3f26	instructor	ꞮN-stɹəktɝ	/ˌɪnˈstɹəktɝ/	noun	một số người dạy để kiếm sống	Please check the instructor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-8a1599d89ee5	keyboard	KI-bɔɹd	/ˈkiˌbɔɹd/	noun	phần máy tính mà bạn nhập vào	Please check the keyboard before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-8c7e1aba6650	media	MIDIƏ	/ˈmidiə/	noun	liên quan đến các hình thức giao tiếp khác nhau, ví dụ: đài phát thanh, TV, báo chí, v.v.	Please check the media before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-910560d282e7	supermarket	SUPɝ-mɑɹkɪt	/ˈsupɝˌmɑɹkɪt/	noun	một cửa hàng tự phục vụ lớn bán thực phẩm và đồ gia dụng	Please check the supermarket before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e786-774c-a3a2-95e65c23a48a	valid	VÆⱢꞮD	/ˈvæɫɪd/	noun	just, fair, right	Please check the valid before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-9ad336614d7a	admission	ÆD-mɪʃən	/ædˈmɪʃən/	noun	bước vào một cái gì đó	Please check the admission before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-9ef545a0cb2e	laptop	ⱢÆP-tɑp	/ˈɫæpˌtɑp/	noun	một chiếc máy tính đủ nhỏ để mang theo và sử dụng trong lòng bạn	Please check the laptop before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-a04b8304ceaf	underline	ƏNDɝ-ɫaɪn	/ˈəndɝˌɫaɪn/	noun	để kêu gọi sự chú ý đến	Please check the underline before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-a77c57a2ee84	electrical	Ɪ-ɫɛktɹɪkəɫ	/ɪˈɫɛktɹɪkəɫ/	adjective	liên quan đến điện	This is a electrical solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e786-774c-a3a2-ab6d6bd89ac9	airplane	Ɛɹ-pɫeɪn	/ˈɛɹˌpɫeɪn/	noun	một chiếc xe chạy bằng điện bay qua không trung đến đích của nó	Please check the airplane before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-4a06ee2efd76	assignment	Ə-saɪnmənt	/əˈsaɪnmənt/	noun	một dự án hoặc nhiệm vụ	Please check the assignment before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-4f2ba2e5b2e1	exit	ƐꞬZꞮT	/ˈɛɡzɪt/	noun	Bỏ đi.	Please check the exit before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-52052accbbed	attendee	Ə-tɛn-di	/əˈtɛnˈdi/	noun	ai đó có mặt (tại một cuộc họp hoặc sự kiện)	Please check the attendee before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e787-70a8-b7ba-56e100e9ba95	cruise	KɹUZ	/ˈkɹuz/	verb	một kỳ nghỉ dài, thư giãn trên tàu	They decided to cruise the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e787-70a8-b7ba-5a10542945e1	birthday	BɝΘ-deɪ	/ˈbɝθˌdeɪ/	noun	ngày trong năm mà một người được sinh ra	Please check the birthday before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-5ce167c1b043	comprehension	KⱭMPɹI-hɛnʃən	/ˌkɑmpɹiˈhɛnʃən/	noun	hành động hiểu biết	Please check the comprehension before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-63655113425b	mall	MƆⱢ	/ˈmɔɫ/	noun	tòa nhà rất lớn có rất nhiều cửa hàng và nhà hàng	Please check the mall before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-67f2c2ca8283	medication	MƐDƏ-keɪʃən	/ˌmɛdəˈkeɪʃən/	noun	một chất được sử dụng để làm cho một căn bệnh hoặc tình trạng trở nên tốt hơn	Please check the medication before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-6b5531b2dac9	recycle	ɹI-saɪkəɫ	/ɹiˈsaɪkəɫ/	noun	để tìm một cách sử dụng khác cho thứ gì đó sẽ bị bỏ vào thùng rác	Please check the recycle before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-6f78b10bcef3	renew	ɹꞮ-nu	/ɹɪˈnu/	noun	để làm lại một cái gì đó mới	Please check the renew before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e787-70a8-b7ba-70cc21363a7c	tenant	TƐNƏNT	/ˈtɛnənt/	adjective	người trả tiền thuê nhà để sử dụng tài sản như đất đai hoặc phòng	This is a tenant solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e788-756f-aa70-64f92d757925	sandwich	SÆMWꞮTƩ	/ˈsæmwɪtʃ/	noun	hai miếng bánh mì có nhân bên trong, ví dụ: thịt hoặc mứt	Please check the sandwich before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-68bcd367dbfd	mini	MꞮNI	/ˈmɪni/	noun	nhỏ hơn bình thường đối với một loại vật cụ thể	Please check the mini before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-6d6943b81099	fitness	FꞮTNƏS	/ˈfɪtnəs/	noun	tình trạng sức khỏe	Please check the fitness before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-70280d6b7da5	inconvenience	ꞮNKƏN-vinjəns	/ˌɪnkənˈvinjəns/	noun	một cái gì đó gây rắc rối hoặc khó chịu	Please check the inconvenience before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-76cbb4bf8582	banquet	BÆŊKWƏT	/ˈbæŋkwət/	noun	một bữa ăn trang trọng dành cho rất nhiều người	Please check the banquet before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-7b43fc364176	closet	KⱢⱭZƏT	/ˈkɫɑzət/	noun	một cái tủ nhỏ	Please check the closet before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-7c6f298406a9	unreal	ƏN-ɹiɫ	/ənˈɹiɫ/	adjective	không đúng với cuộc sống	This is a unreal solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-8121119a42c8	distractor	DISTRACTOR	/distractor/	noun	một lựa chọn không chính xác được cung cấp trong một câu hỏi trắc nghiệm	Please check the distractor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-8503c27c43ed	expire	ꞮK-spaɪɹ	/ɪkˈspaɪɹ/	noun	Come to an end Phải một lần kết thúc	Please check the expire before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e788-756f-aa70-88bd11932806	folder	FOƱⱢDɝ	/ˈfoʊɫdɝ/	noun	một tập tin hoặc bìa để giữ giấy tờ trong	Please check the folder before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e788-756f-aa70-8f91145ce3de	photocopy	FOƱTOƱ-kɑpi	/ˈfoʊtoʊˌkɑpi/	noun	một bản sao chính xác của một tài liệu được làm bằng máy chụp ảnh	Please check the photocopy before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e789-73a2-82a5-f8405ec1b835	renovate	ɹƐNƏ-veɪt	/ˈɹɛnəˌveɪt/	verb	khôi phục lại tình trạng trước đó hoặc tốt hơn.	They decided to renovate the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a5-fef435fabf5c	sunny	SƏNI	/ˈsəni/	noun	một ngày không có mây hoặc mưa chỉ có ánh nắng mặt trời	Please check the sunny before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-009da8f0a01a	calendar	KÆⱢƏNDɝ	/ˈkæɫəndɝ/	noun	một cái gì đó bạn treo trên tường có các tháng trong năm trên đó	Please check the calendar before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-074d462a21db	donation	DOƱ-neɪʃən	/doʊˈneɪʃən/	noun	số tiền được trao cho một mục đích hoặc tổ chức từ thiện	Please check the donation before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-0907cad25ce3	feedback	FID-bæk	/ˈfidˌbæk/	noun	thông tin được cung cấp cho nhà cung cấp về mức độ tốt hay xấu của hàng hóa hoặc dịch vụ	Please check the feedback before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e789-73a2-82a6-0f5c3459cab7	shortly	ƩƆɹTⱢI	/ˈʃɔɹtɫi/	adverb	- Vậy, mong sớm gặp lại chàng	She responded shortly to the client's request.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-12fbc607302e	snack	SNÆK	/ˈsnæk/	noun	Một lượng nhỏ thức ăn ăn giữa các bữa ăn	Please check the snack before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-14f985bac0e1	copier	KⱭPIɝ	/ˈkɑpiɝ/	noun	một cỗ máy tạo ra các bản sao giấy	Please check the copier before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-1ac90a3687a4	provider	PɹƏ-vaɪdɝ	/pɹəˈvaɪdɝ/	noun	một người chăm sóc người khác bằng tiền bạc, thức ăn, nhà cửa	Please check the provider before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-1c1f267835bc	hungry	HƏŊꞬɹI	/ˈhəŋɡɹi/	noun	cần thức ăn, cần ăn	Please check the hungry before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e789-73a2-82a6-20472e5b1a4b	inspection	ꞮN-spɛkʃən	/ˌɪnˈspɛkʃən/	noun	một cuộc kiểm tra chính thức hoặc chính thức về một cái gì đó	Please check the inspection before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-7f73083cf7c8	recipient	ɹƏ-sɪpiənt	/ɹəˈsɪpiənt/	adjective	người nhận được một cái gì đó	This is a recipient solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-82d1b0f3c6e3	aisle	AꞮƏⱢ	/ˈaɪəɫ/	noun	khu vực hẹp dài để đi bộ giữa các hàng của một cái gì đó	Please check the aisle before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-86494553ff17	inspect	ꞮN-spɛkt	/ˌɪnˈspɛkt/	noun	xem qua cẩn thận	Please check the inspect before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-8b1fe288de3d	mechanic	MƏ-kænɪk	/məˈkænɪk/	noun	một người sửa chữa máy móc để kiếm sống	Please check the mechanic before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-8c74f4e65151	merger	MɝDƷɝ	/ˈmɝdʒɝ/	noun	khi một công ty mua một công ty khác để tạo ra một công ty lớn	Please check the merger before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-901f8d107f6e	soccer	SⱭKɝ	/ˈsɑkɝ/	noun	trò chơi bóng được chơi bởi hai đội cố gắng ghi bàn mà không cần xử lý bóng	Please check the soccer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-9560c34de5d5	sweater	SWƐTɝ	/ˈswɛtɝ/	noun	một bộ quần áo ấm được mặc trên cánh tay và phần trên cơ thể, làm bằng len,	Please check the sweater before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-9a1b8033f6a0	rewrite	ɹI-ɹaɪt	/ˈɹiˌɹaɪt/	noun	để viết lại theo cách khác	Please check the rewrite before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-9e81faff1e29	workplace	WɝK-pɫeɪs	/ˈwɝkˌpɫeɪs/	noun	địa điểm nơi bạn thực hiện công việc của mình	Please check the workplace before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78a-73a9-8afc-a363ac218cfc	architect	ⱭɹKƏ-tɛkt	/ˈɑɹkəˌtɛkt/	noun	người thiết kế các tòa nhà	Please check the architect before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78b-7251-ba8e-fbc9b93e9881	convenience	KƏN-vinjəns	/kənˈvinjəns/	noun	trạng thái dễ dàng	Please check the convenience before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e78b-7251-ba8e-fe6ee2ae76e1	eligible	ƐⱢƏDƷƏBƏⱢ	/ˈɛɫədʒəbəɫ/	adjective	có thể được chọn	This is a eligible solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-33ba910588b1	indoor	ꞮN-dɔɹ	/ˈɪnˌdɔɹ/	noun	bên trong một ngôi nhà hoặc tòa nhà	Please check the indoor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-374738a6e435	baggage	BÆꞬƏDƷ	/ˈbæɡədʒ/	noun	túi du lịch	Please check the baggage before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-3a1c5f954d7e	dial	DAꞮƏⱢ	/ˈdaɪəɫ/	adjective	để thực hiện cuộc gọi điện thoại bằng cách nhấn các nút	This is a dial solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-3d39bbf40a97	container	KƏN-teɪnɝ	/kənˈteɪnɝ/	noun	một cái gì đó giữ mọi thứ	Please check the container before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-404cfb14aabc	drawer	DɹƆɹ	/ˈdɹɔɹ/	noun	một ngăn trượt mà bạn giữ đồ đạc trong đó	Please check the drawer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e791-766e-b89d-46c0b9171f67	lab	ⱢÆB	/ˈɫæb/	noun	nơi bạn thực hiện các thí nghiệm	Please check the lab before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-4c73c4921850	submission	SƏB-mɪʃən	/səbˈmɪʃən/	noun	hành động chính thức cung cấp một tài liệu, để đưa ra quyết định về nó	Please check the submission before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e792-76ae-8eee-5029b689d424	bulletin	BƱⱢꞮTƏN	/ˈbʊɫɪtən/	noun	một báo cáo tin tức ngắn	Please check the bulletin before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e792-76ae-8eee-542ffbb588d3	certificate	Sɝ-tɪfɪkət	/sɝˈtɪfɪkət/	verb	một mảnh giấy nói rằng bạn đã làm điều gì đó	They decided to certificate the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-59f5e33390fe	gym	DƷꞮM	/ˈdʒɪm/	noun	xây dựng với thiết bị bạn có thể sử dụng để tập thể dục cơ thể của bạn	Please check the gym before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-5c73b9175df5	highway	HAꞮ-weɪ	/ˈhaɪˌweɪ/	noun	một con đường chính kết nối các thành phố	Please check the highway before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-62e3814012cf	respondent	ɹꞮ-spɑndənt	/ɹɪˈspɑndənt/	adjective	người trả lời câu hỏi nào đó	This is a respondent solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e792-76ae-8eee-657f29705984	jewelry	DƷUƏⱢɹI	/ˈdʒuəɫɹi/	noun	vàng, bạc, đá, v.v. bạn đeo để trang trí, ví dụ như vòng cổ	Please check the jewelry before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-686925db3664	battery	BÆTɝI	/ˈbætɝi/	noun	một cái gì đó tạo ra năng lượng điện	Please check the battery before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-6f75c03026fb	donate	DOƱ-neɪt	/ˈdoʊˌneɪt/	verb	để quyên góp tiền cho một mục đích hoặc tổ chức từ thiện	They decided to donate the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-720889bb87be	outstanding	AƱT-stændɪŋ	/ˌaʊtˈstændɪŋ/	verb	Chưa hoàn thành	They decided to outstanding the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-7763fe98fe72	skim	SKꞮM	/ˈskɪm/	noun	di chuyển nhanh trên bề mặt mà không cần chạm vào nó	Please check the skim before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e792-76ae-8eee-7bbdf0cb0b55	briefcase	BɹIF-keɪs	/ˈbɹifˌkeɪs/	noun	một hộp nhỏ có tay cầm thường được sử dụng để đựng giấy tờ kinh doanh	Please check the briefcase before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-55a7e76a36a1	dessert	DꞮ-zɝt	/dɪˈzɝt/	noun	thức ăn ngọt bạn ăn sau bữa ăn chính	Please check the dessert before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-5a05fa3910d2	impact	ꞮMPÆKT	/ˈɪmpækt/	noun	ảnh hưởng mà một thứ tạo ra đối với một thứ khác	Please check the impact before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-5f2f83ef991d	innovative	ꞮNƏ-veɪtɪv	/ˈɪnəˌveɪtɪv/	adjective	sáng tạo và đưa ra những ý tưởng mới	This is a innovative solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-631988c37c37	inquire	ꞮN-kwaɪɹ	/ˌɪnˈkwaɪɹ/	noun	để hỏi về	Please check the inquire before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-64d3c5722885	overnight	OƱVɝ-naɪt	/ˈoʊvɝˈnaɪt/	noun	từ ngày này sang ngày khác	Please check the overnight before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-6960b4cadd39	venue	VƐNJU	/ˈvɛnju/	noun	nơi diễn ra sự kiện	Please check the venue before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-6e5aea07ab43	commuter	KƏM-jutɝ	/kəmˈjutɝ/	noun	một người đi một chặng đường dài để làm việc và trở lại	Please check the commuter before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-72ca39ea8d92	logo	ⱢOƱꞬOƱ	/ˈɫoʊɡoʊ/	noun	một thiết kế nhỏ được một công ty sử dụng làm biểu tượng	Please check the logo before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e793-7767-9325-7601484f7c21	newsletter	NUZ-ɫɛtɝ	/ˈnuzˌɫɛtɝ/	noun	báo cáo hoặc thư ngỏ cung cấp thông tin quan tâm cho một nhóm đặc biệt	Please check the newsletter before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e793-7767-9325-7b72f1a56a5f	advisor	ÆD-vaɪzɝ	/ædˈvaɪzɝ/	noun	một người đưa ra ý kiến về những việc cần làm	Please check the advisor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-a553776861b0	cartridge	KⱭɹTɹƏDƷ	/ˈkɑɹtɹədʒ/	noun	một bộ phận của thiết bị là một bộ phận kín, và có thể được lấy ra và thay thế	Please check the cartridge before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-ab6742fdbcb4	cloudy	KⱢAƱDI	/ˈkɫaʊdi/	noun	thời tiết nơi bầu trời đầy mây	Please check the cloudy before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-af82af714f02	photographer	FƏ-tɑɡɹəfɝ	/fəˈtɑɡɹəfɝ/	noun	một người chụp ảnh để kiếm sống	Please check the photographer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-b1642e8caf2e	shopper	ƩⱭPɝ	/ˈʃɑpɝ/	noun	người mua đồ trong cửa hàng	Please check the shopper before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-b7df9a3475b3	tag	TÆꞬ	/ˈtæɡ/	noun	nhãn	Please check the tag before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-baf26a667101	announcer	Ə-naʊnsɝ	/əˈnaʊnsɝ/	noun	một người đưa ra thông điệp công khai	Please check the announcer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e794-71be-9ae0-bec8a99b5647	aspect	ÆS-pɛkt	/ˈæsˌpɛkt/	noun	một phần hoặc một tính năng	Please check the aspect before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-c14de50d677c	audit	ƆDꞮT	/ˈɔdɪt/	noun	để kiểm tra một cái gì đó là chính xác, thường liên quan đến các tài khoản trong kinh doanh	Please check the audit before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e794-71be-9ae0-c4c3daea833d	contractor	KⱭN-tɹæktɝ	/ˈkɑnˌtɹæktɝ/	noun	Một người xây dựng.	Please check the contractor before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e794-71be-9ae0-cadeed37bf78	download	DAƱN-ɫoʊd	/ˈdaʊnˌɫoʊd/	noun	chuyển một tập tin hoặc chương trình vào máy tính của bạn	Please check the download before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e794-71be-9ae0-cdf76c9b6af9	password	PÆS-wɝd	/ˈpæsˌwɝd/	noun	một từ hoặc cụm từ bí mật cần thiết để chứng minh bạn là ai	Please check the password before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be20-f4f72fe81f13	prohibit	PɹOƱ-hɪbət	/pɹoʊˈhɪbət/	noun	không cho phép	Please check the prohibit before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be20-f82b71e2ee13	stadium	STEꞮDIƏM	/ˈsteɪdiəm/	noun	sân thể thao được bao quanh bởi các hàng ghế, nơi mọi người đến xem các sự kiện	Please check the stadium before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be20-fcef42a0197c	terminal	TɝMƏNƏⱢ	/ˈtɝmənəɫ/	adjective	nơi một tuyến giao thông kết thúc, giống như nhà ga xe lửa cuối cùng trên tuyến	This is a terminal solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e795-775e-be21-02a9a4acd46e	weekday	WIK-deɪ	/ˈwikˌdeɪ/	noun	Tất cả các ngày làm việc trong một tuần, thường là từ thứ Hai đến thứ Sáu	Please check the weekday before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-069c86ea4fe3	bonus	BOƱNƏS	/ˈboʊnəs/	noun	thêm, thường ở dạng tiền	Please check the bonus before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-095a950a8d41	cart	KⱭɹT	/ˈkɑɹt/	noun	một toa xe hoặc xe tải được sử dụng để vận chuyển	Please check the cart before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e795-775e-be21-0dbd25f4cf06	ink	ꞮŊK	/ˈɪŋk/	noun	chất lỏng được tìm thấy trong bút	Please check the ink before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-120b20e79b79	waitress	WEꞮTɹƏS	/ˈweɪtɹəs/	noun	một người phụ nữ có công việc là mang bữa ăn đến bàn của bạn trong nhà hàng hoặc quán cà phê	Please check the waitress before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-16dba741a516	cleaner	KⱢINɝ	/ˈkɫinɝ/	noun	một người dọn dẹp để kiếm sống	Please check the cleaner before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-1a400e481fe8	developer	DꞮ-vɛɫəpɝ	/dɪˈvɛɫəpɝ/	noun	người thiết kế và xây dựng tài sản	Please check the developer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e795-775e-be21-1e8b00e45231	headquarter	HƐD-kɔɹtɝ	/ˈhɛdˌkɔɹtɝ/	noun	văn phòng chính của một tổ chức	Please check the headquarter before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e796-7544-adb1-cff550957880	shuttle	ƩƏTƏⱢ	/ˈʃətəɫ/	noun	di chuyển qua lại giữa hai điểm	Please check the shuttle before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-d14ebd8f43d1	stationery	STEꞮƩƏ-nɛɹi	/ˈsteɪʃəˌnɛɹi/	noun	bất kỳ tài liệu nào cần thiết cho việc viết và in	Please check the stationery before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-d75f7eb6759c	subscribe	SƏBS-kɹaɪb	/səbsˈkɹaɪb/	noun	trả tiền để nhận dịch vụ hoặc sản phẩm thường xuyên	Please check the subscribe before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e796-7544-adb1-dad719eda3db	alike	Ə-ɫaɪk	/əˈɫaɪk/	noun	tương tự, gần như giống nhau	Please check the alike before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-dedaf229f99f	picnic	PꞮK-nɪk	/ˈpɪkˌnɪk/	noun	một bữa ăn được đóng gói để mang theo bạn và ăn ngoài trời	Please check the picnic before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-e2acec2a60b6	refreshment	ɹƏ-fɹɛʃmənt	/ɹəˈfɹɛʃmənt/	noun	một lượng nhỏ thức ăn và đồ uống được dùng như một bữa ăn nhẹ	Please check the refreshment before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-e745c8518815	administrative	ƏD-mɪnə-stɹeɪtɪv	/ədˈmɪnəˌstɹeɪtɪv/	adjective	liên quan đến việc quản lý một văn phòng	This is a administrative solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e796-7544-adb1-ebcf5e9f69dd	commonly	KⱭMƏNⱢI	/ˈkɑmənɫi/	adverb	thường xuyên, thường là	She responded commonly to the client's request.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-ed247d8db07e	distribution	DꞮSTɹƏB-juʃən	/ˌdɪstɹəbˈjuʃən/	noun	hành động lưu thông mọi thứ trong một khu vực rộng lớn	Please check the distribution before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-f08e631765db	sofa	SOƱFƏ	/ˈsoʊfə/	noun	một chiếc ghế mềm dài có lưng, đủ lớn để ít nhất hai người ngồi lên	Please check the sofa before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e796-7544-adb1-f57b57f88f62	accommodate	Ə-kɑmə-deɪt	/əˈkɑməˌdeɪt/	verb	để cho đi thứ gì đó cần thiết	They decided to accommodate the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e797-740c-9f29-f0556021ee8e	affordable	Ə-fɔɹdəbəɫ	/əˈfɔɹdəbəɫ/	adjective	không đắt, người ta có thể thanh toán dễ dàng	This is a affordable solution for our team.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e797-740c-9f29-f68697271aac	annoy	Ə-nɔɪ	/əˈnɔɪ/	noun	làm phiền hoặc gây khó chịu	Please check the annoy before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e797-740c-9f29-f8b3c282dfba	coordinate	KOƱ-ɔɹdə-neɪt	/koʊˈɔɹdəˌneɪt/	verb	để tổ chức hoặc quản lý	They decided to coordinate the plan after the review.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e797-740c-9f29-fce462fa730a	paperwork	PEꞮPɝ-wɝk	/ˈpeɪpɝˌwɝk/	noun	công việc bằng văn bản liên quan đến bất kỳ công việc cụ thể nào	Please check the paperwork before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e797-740c-9f2a-037db895f853	quit	KWꞮT	/ˈkwɪt/	noun	ngừng lại việc gì; thôi làm việc gì	Please check the quit before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79d-76c6-a17f-93c0cb04dadd	authority	Ə-θɔɹəti	/əˈθɔɹəti/	noun	quyền ra lệnh và ra quyết định	Please check the authority before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79d-76c6-a17f-96c6efefc259	flu	FⱢU	/ˈfɫu/	noun	bệnh mà bạn mắc phải từ người khác, khiến bạn bị sốt trong vài ngày	Please check the flu before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79d-76c6-a17f-9b13f5ace783	captain	KÆPTƏN	/ˈkæptən/	noun	người phụ trách một con tàu hoặc máy bay	Please check the captain before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e79d-76c6-a17f-9db9295c14df	installation	ꞮNSTƏ-ɫeɪʃən	/ˌɪnstəˈɫeɪʃən/	noun	hành động kết nối hoặc nhập một cái gì đó	Please check the installation before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-c8ad6d80eb06	trainer	TɹEꞮNɝ	/ˈtɹeɪnɝ/	noun	một người dạy một người hoặc động vật làm điều gì đó	Please check the trainer before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-cc025840eefd	availability	Ə-veɪɫə-bɪɫəti	/əˌveɪɫəˈbɪɫəti/	noun	Có mặt và có thể được sử dụng	Please check the availability before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e79e-70a2-a832-d3a34b54022f	complimentary	KⱭMPⱢƏ-mɛntɝi	/ˌkɑmpɫəˈmɛntɝi/	noun	nó không tốn bất cứ thứ gì, nó miễn phí	Please check the complimentary before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e79e-70a2-a832-d6df32c041a8	hike	HAꞮK	/ˈhaɪk/	noun	đi bộ một quãng đường dài	Please check the hike before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-d8588a453ac2	midnight	MꞮD-naɪt	/ˈmɪdˌnaɪt/	noun	12 giờ đêm	Please check the midnight before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-dc33b747b3c4	productivity	PɹOƱDƏK-tɪvəti	/ˌpɹoʊdəkˈtɪvəti/	noun	khối lượng công việc đã thực hiện	Please check the productivity before the meeting.	\N	easy	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-e0d9051d579c	rainy	ɹEꞮNI	/ˈɹeɪni/	noun	nước từ những đám mây, ẩm ướt hoặc mưa rào	Please check the rainy before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-e7603ec47caf	relocate	ɹI-ɫoʊkeɪt	/ˌɹiˈɫoʊkeɪt/	verb	để di chuyển đến một địa điểm mới	They decided to relocate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-e88d244df652	transaction	TɹÆN-zækʃən	/tɹænˈzækʃən/	noun	một cuộc trao đổi giữa hai người	Please check the transaction before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79e-70a2-a832-efbe778e4b33	unhappy	ƏN-hæpi	/ənˈhæpi/	noun	cảm thấy ít hoặc không có niềm vui	Please check the unhappy before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e79e-70a2-a832-f3e4a1a4a13e	verify	VƐɹƏ-faɪ	/ˈvɛɹəˌfaɪ/	verb	xác nhận sự thật về	They decided to verify the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-49e3d3c107e7	automobile	ƆTƏMOƱ-biɫ	/ˈɔtəmoʊˌbiɫ/	noun	tên dài cho 'xe hơi'	Please check the automobile before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-4f19bd7adc39	courier	KɝIɝ	/ˈkɝiɝ/	noun	Người được trả tiền để mang và giao tài liệu	Please check the courier before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e79f-7545-94ae-502835d04eee	incomplete	ꞮNKƏM-pɫit	/ˌɪnkəmˈpɫit/	noun	chưa hoàn thành	Please check the incomplete before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-56c8e16ac334	questionnaire	KWƐSTƩƏ-nɛɹ	/ˌkwɛstʃəˈnɛɹ/	noun	một bộ câu hỏi để tìm hiểu suy nghĩ của mọi người về điều gì đó	Please check the questionnaire before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-59666af88e56	baseball	BEꞮS-bɔɫ	/ˈbeɪsˈbɔɫ/	noun	một trò chơi thể thao với gậy và bóng	Please check the baseball before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-5e9740926b19	dock	DⱭK	/ˈdɑk/	noun	nơi thuyền bị trói	Please check the dock before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-639064ae2158	lamp	ⱢÆMP	/ˈɫæmp/	noun	một nguồn sáng nhân tạo	Please check the lamp before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-671bdfc4b24c	lately	ⱢEꞮTⱢI	/ˈɫeɪtɫi/	adverb	gần đây, mới đây	She responded lately to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-6bbcc713478e	machinery	MƏ-ʃinɝi	/məˈʃinɝi/	noun	Công cụ dụng cụ khác	Please check the machinery before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e79f-7545-94ae-6cddd3ef6106	presenter	PɹƐZƏNTɝ	/ˈpɹɛzəntɝ/	noun	một người thể hiện và giải thích điều gì đó cho khán giả	Please check the presenter before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e79f-7545-94ae-71d217f23477	seldom	SƐⱢDƏM	/ˈsɛɫdəm/	noun	Không thường xuyên lắm	Please check the seldom before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-0f9a1e8e7769	signature	SꞮꞬNƏTƩɝ	/ˈsɪɡnətʃɝ/	noun	tên của bạn được viết bằng chữ viết tay của chính bạn	Please check the signature before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-103baa7758d1	worldwide	WɝⱢD-waɪd	/ˈwɝɫdˈwaɪd/	noun	Trải dài hoặc vươn ra khắp trái đất	Please check the worldwide before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-167bb8a6e905	carrier	KÆɹIɝ	/ˈkæɹiɝ/	noun	một người hoặc vật mang theo thứ gì đó	Please check the carrier before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-190c15cdfc2a	designate	DƐZƏꞬ-neɪt	/ˈdɛzəɡˌneɪt/	verb	để đặt tên hoặc chọn ai đó cho một cái gì đó	They decided to designate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-1dde4c7a7bf7	exclusive	ꞮK-skɫusɪv	/ɪkˈskɫusɪv/	adjective	chỉ dành cho một nhóm nhất định	This is a exclusive solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-20a6c325de3c	homework	HOƱM-wɝk	/ˈhoʊmˌwɝk/	noun	công việc mà giáo viên giao cho học sinh thực hiện bên ngoài trường học	Please check the homework before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-251cc8a9f370	memorandum	MƐMɝ-ændəm	/ˌmɛmɝˈændəm/	noun	Một ghi chú hoặc tin nhắn bằng văn bản để nhắc bạn hoặc người khác làm điều gì đó	Please check the memorandum before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7a0-7555-8761-28095028f287	photocopier	FOƱTOƱ-kɑpiɝ	/ˈfoʊtoʊˌkɑpiɝ/	noun	một máy tạo bản sao chính xác của tài liệu	Please check the photocopier before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7a0-7555-8761-2f632a442af5	suite	SWIT	/ˈswit/	noun	một tập hợp các phòng thông nhau, thường là trong một khách sạn	Please check the suite before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-333b2e7d3023	thorough	ΘɝOƱ	/ˈθɝoʊ/	noun	phải được thực hiện cẩn thận và đầy đủ, ví dụ: tìm kiếm kỹ lưỡng	Please check the thorough before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a0-7555-8761-3415147cfed9	bookstore	BƱK-stɔɹ	/ˈbʊkˌstɔɹ/	noun	Nơi bạn đến để mua sách	Please check the bookstore before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-c8dc5d896bc6	cater	KEꞮTɝ	/ˈkeɪtɝ/	noun	để chế biến và giao đồ ăn	Please check the cater before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7a1-703a-b555-cc1153001ad5	dental	DƐNƏⱢ	/ˈdɛnəɫ/	adjective	liên quan đến răng	This is a dental solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-d0352b5a8a73	duration	DƱ-ɹeɪʃən	/ˈdʊˈɹeɪʃən/	noun	mất bao lâu để hoàn thành một việc	Please check the duration before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-d6fd4ca89d21	lounge	ⱢAƱNDƷ	/ˈɫaʊndʒ/	noun	một nơi để thư giãn	Please check the lounge before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-d8992f73c00e	painter	PEꞮNTɝ	/ˈpeɪntɝ/	noun	một nghệ sĩ vẽ tranh	Please check the painter before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-de218f4a20f4	patron	PEꞮTɹƏN	/ˈpeɪtɹən/	noun	người hỗ trợ bằng thời gian, tiền bạc hoặc nỗ lực	Please check the patron before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-e3fba329b0f1	prescription	PɹƏS-kɹɪpʃən	/pɹəsˈkɹɪpʃən/	noun	đơn đặt thuốc bằng văn bản của bác sĩ	Please check the prescription before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-e4072daf0067	productive	Pɝ-dəktɪv	/pɝˈdəktɪv/	adjective	hữu ích hoặc đáng giá, ví dụ: một cuộc họp hiệu quả	This is a productive solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-e8818ee436e0	salad	SÆⱢƏD	/ˈsæɫəd/	noun	thực phẩm làm từ chủ yếu là lá hoặc rau diếp và rau	Please check the salad before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-ed2e9207666e	stack	STÆK	/ˈstæk/	noun	một đống đồ vật được đặt chồng lên nhau	Please check the stack before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-f1ca388a8725	delegate	DƐⱢƏ-ɡeɪt	/ˈdɛɫəˌɡeɪt/	verb	giao nhiệm vụ cho người khác làm	They decided to delegate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-f7648b86cc7a	salesperson	SEꞮⱢZ-pɝsən	/ˈseɪɫzˌpɝsən/	noun	một người đàn ông hoặc phụ nữ có công việc là khiến mọi người mua đồ từ công ty của họ	Please check the salesperson before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7a1-703a-b555-f8041a8ff3c8	calculator	KÆⱢKJƏ-ɫeɪtɝ	/ˈkæɫkjəˌɫeɪtɝ/	noun	một thiết bị làm toán cho bạn	Please check the calculator before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a1-703a-b555-fe9abe66ffe0	completion	KƏM-pɫiʃən	/kəmˈpɫiʃən/	noun	kết thúc, điểm kết thúc	Please check the completion before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-d1140f544c3c	defect	DIFƐKT	/ˈdifɛkt/	noun	một cái gì đó bị lỗi	Please check the defect before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-d5301b44973a	garbage	ꞬⱭɹBꞮDƷ	/ˈɡɑɹbɪdʒ/	noun	rác; một cái gì đó vô giá trị	Please check the garbage before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-d8711bd204bc	omit	OƱ-mɪt	/oʊˈmɪt/	noun	bỏ đi hoặc không nói	Please check the omit before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-dd1818149285	spite	SPAꞮT	/ˈspaɪt/	noun	mong muốn hướng cảm giác xấu về ai đó	Please check the spite before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7a2-726b-b7ff-e37042e2a588	bathroom	BÆ-θɹum	/ˈbæˌθɹum/	noun	phòng có bồn tắm và/hoặc vòi sen	Please check the bathroom before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-e673fdf3fe49	cab	KÆB	/ˈkæb/	noun	xe taxi	Please check the cab before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-e85b5eec57c6	correspondence	KƆɹƏ-spɑndəns	/ˌkɔɹəˈspɑndəns/	noun	giao tiếp bằng thư	Please check the correspondence before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e7a2-726b-b7ff-eca58c9022ce	ladder	ⱢÆDɝ	/ˈɫædɝ/	noun	một cái gì đó bạn sử dụng để leo lên cao	Please check the ladder before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-f0a8ac779cf5	photography	FƏ-tɑɡɹəfi	/fəˈtɑɡɹəfi/	noun	nghệ thuật chụp ảnh	Please check the photography before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-f78d191fa514	sculpture	SKƏⱢPTƩɝ	/ˈskəɫptʃɝ/	noun	một hình vẽ hoặc bức tượng	Please check the sculpture before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-fad2e66bbf7b	anniversary	ÆNƏ-vɝsɝi	/ˌænəˈvɝsɝi/	noun	một ngày đáng nhớ	Please check the anniversary before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b7ff-ff8d4ed0f4a0	buffet	BƏFƏT	/ˈbəfət/	noun	một bữa ăn bao gồm một số món ăn khác nhau mà mọi người tự phục vụ	Please check the buffet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b800-013646c78893	defective	DꞮ-fɛktɪv	/dɪˈfɛktɪv/	adjective	khi một cái gì đó không hoạt động	This is a defective solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b800-068cf80dfe25	leak	ⱢIK	/ˈɫik/	noun	để nhỏ giọt nước hoặc chất lỏng khác	Please check the leak before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b800-0b6d3e4290b7	occupancy	ⱭKJƏPƏNSI	/ˈɑkjəpənsi/	noun	tình trạng sống ở một nơi	Please check the occupancy before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a2-726b-b800-0f1ae81ef324	proficiency	PɹƏ-fɪʃənsi	/pɹəˈfɪʃənsi/	noun	kỹ năng và kinh nghiệm	Please check the proficiency before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-adb30dbca894	renewal	ɹꞮ-nuəɫ	/ɹɪˈnuəɫ/	adjective	hành động làm lại một cái gì đó mới	This is a renewal solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-b26d15d1ae59	urgent	ɝDƷƏNT	/ˈɝdʒənt/	adjective	rất quan trọng, cần chú ý ngay bây giờ	This is a urgent solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-b4d7ef0611d4	annually	ÆNJUƏⱢI	/ˈænjuəɫi/	adverb	12 tháng một lần	She responded annually to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-b855f025a207	basketball	BÆSKƏT-bɔɫ	/ˈbæskətˌbɔɫ/	noun	một trò chơi được chơi bởi hai đội cố gắng ghi bàn bằng cách ném bóng	Please check the basketball before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-bc7bb309b46c	delete	DꞮ-ɫit	/dɪˈɫit/	noun	Loại bỏ	Please check the delete before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-c14a2aabf49c	illogical	Ɪ-ɫɑdʒɪkəɫ	/ˌɪˈɫɑdʒɪkəɫ/	adjective	không có ý nghĩa gì, thiếu lý luận	This is a illogical solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-c75e628918ec	pet	PƐT	/ˈpɛt/	noun	một con vật bạn nuôi trong nhà để chơi cùng	Please check the pet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-ca6450dc89c0	textbook	TƐKST-bʊk	/ˈtɛkstˌbʊk/	noun	một cuốn sách về các sự kiện được sử dụng để nghiên cứu một chủ đề cụ thể	Please check the textbook before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-cf6cf3fcf47d	accurately	ÆKJɝƏTⱢI	/ˈækjɝətɫi/	adverb	khi một việc gì đó được thực hiện chính xác	She responded accurately to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-d2dccbda9e28	cabin	KÆBƏN	/ˈkæbən/	noun	một ngôi nhà nhỏ trong rừng	Please check the cabin before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-d63028984bb7	conductor	KƏN-dəktɝ	/kənˈdəktɝ/	noun	một người lãnh đạo	Please check the conductor before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7a3-705a-874c-d9b91e43346d	inspector	ꞮN-spɛktɝ	/ˌɪnˈspɛktɝ/	noun	một sĩ quan cảnh sát cấp cao	Please check the inspector before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7a9-7707-b29c-83edb2f11c60	intern	ꞮNTɝN	/ˈɪntɝn/	noun	một stuent hoặc thực tập sinh đang làm một công việc, thường không được trả lương, để có được kinh nghiệm làm việc	Please check the intern before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	hr
01a0aec8-e7aa-77e7-ba4d-f5d548cb3b4f	semester	SƏ-mɛstɝ	/səˈmɛstɝ/	noun	một trong hai bộ môn của năm học	Please check the semester before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7aa-77e7-ba4d-fb592c458666	confirmation	KⱭNFɝ-meɪʃən	/ˌkɑnfɝˈmeɪʃən/	noun	một cái gì đó xác minh một cái gì đó là đúng	Please check the confirmation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7aa-77e7-ba4d-fc1035f20288	congratulation	KƏN-ɡɹætʃə-ɫeɪʃən	/kənˌɡɹætʃəˈɫeɪʃən/	noun	hành động chúc mừng	Please check the congratulation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7aa-77e7-ba4e-025b3f88388c	expertise	ƐKSPɝ-tiz	/ˌɛkspɝˈtiz/	verb	kiến thức tuyệt vời về một cái gì đó	They decided to expertise the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7aa-77e7-ba4e-06b9de2c2f22	graph	ꞬɹÆF	/ˈɡɹæf/	noun	một hình ảnh hiển thị dữ liệu	Please check the graph before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7aa-77e7-ba4e-09d1ffb8f709	taker	TEꞮKɝ	/ˈteɪkɝ/	noun	một người không cho mà chỉ nhận	Please check the taker before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ab-760c-8add-c33766db32f1	utility	JU-tɪɫəti	/juˈtɪɫəti/	noun	tính thực tế	Please check the utility before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ab-760c-8add-c4efdfc173d9	voucher	VAƱTƩɝ	/ˈvaʊtʃɝ/	noun	một mảnh giấy mà bạn có thể sử dụng để mua hàng hóa hoặc để có được chúng với giá giảm	Please check the voucher before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ab-760c-8add-c89ef5c5d1de	banker	BÆŊKɝ	/ˈbæŋkɝ/	noun	người làm việc cho ngân hàng	Please check the banker before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ab-760c-8add-cf13b035ab33	behalf	BꞮ-hæf	/bɪˈhæf/	noun	để nói hoặc làm điều gì đó cho người khác, ví dụ như thay mặt cho…	Please check the behalf before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ab-760c-8add-d0f627c91c64	minimize	MꞮNƏ-maɪz	/ˈmɪnəˌmaɪz/	verb	để làm cho ít quan trọng hơn hoặc nhỏ hơn	They decided to minimize the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ab-760c-8add-d6c60966cee6	optional	ⱭPƩƏNƏⱢ	/ˈɑpʃənəɫ/	adjective	một lựa chọn, một cái gì đó bạn không phải làm	This is a optional solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ab-760c-8add-da5b5ef87b85	paycheck	PEꞮ-tʃɛk	/ˈpeɪˌtʃɛk/	noun	tờ giấy cho người lao động biết họ đã kiếm được bao nhiêu	Please check the paycheck before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ab-760c-8add-dfe1cbff49f7	protective	PɹƏ-tɛktɪv	/pɹəˈtɛktɪv/	adjective	muốn giữ an toàn	This is a protective solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-c7af9a594717	seller	SƐⱢɝ	/ˈsɛɫɝ/	noun	một người quảng bá hoặc trao đổi hàng hóa hoặc dịch vụ để lấy tiền	Please check the seller before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	hr
01a0aec8-e7ac-765d-b9b4-cbd69f3188fc	sidewalk	SAꞮD-wɔk	/ˈsaɪdˌwɔk/	noun	khu vực chạy bên cạnh một con đường cho mọi người đi bộ	Please check the sidewalk before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-ce21b3a51118	sightsee	SAꞮT-si	/ˈsaɪtˈsi/	noun	đi đến các địa điểm ưa thích	Please check the sightsee before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-d14e62f2ced6	soup	SUP	/ˈsup/	noun	một bữa ăn lỏng, thường nóng	Please check the soup before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-d45196aef855	transit	TɹÆNZꞮT	/ˈtɹænzɪt/	noun	di chuyển từ nơi này đến nơi khác một cách nhanh chóng và tiết kiệm thời gian	Please check the transit before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-d86ef4eef4dd	wallet	WƆⱢƏT	/ˈwɔɫət/	noun	một chiếc vali nhỏ có thể đựng vừa trong túi, được nam giới sử dụng để giữ tiền và thẻ tín dụng	Please check the wallet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ac-765d-b9b4-ddc32e40de1f	cashier	KÆ-ʃɪɹ	/kæˈʃɪɹ/	noun	người có công việc là lấy số tiền bạn trả cho hàng hóa hoặc dịch vụ	Please check the cashier before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ac-765d-b9b4-e0f4286e423b	casual	KÆƷƏWƏⱢ	/ˈkæʒəwəɫ/	adjective	không chắc chắn, không có kế hoạch	This is a casual solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-8968a9f60283	drill	DɹꞮⱢ	/ˈdɹɪɫ/	noun	đục một lỗ vào một cái gì đó	Please check the drill before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-8e57996f38a2	fountain	FAƱNTƏN	/ˈfaʊntən/	noun	một bình xịt nước nhân tạo bắn lên trên	Please check the fountain before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-91c256321ac4	juice	DƷUS	/ˈdʒus/	noun	chất lỏng tự nhiên từ cây hoặc quả	Please check the juice before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-97df90b337ba	lane	ⱢEꞮN	/ˈɫeɪn/	noun	một con đường hẹp	Please check the lane before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-9b959814dd52	popularity	PⱭPJƏ-ɫɛɹəti	/ˌpɑpjəˈɫɛɹəti/	noun	trạng thái được nhiều người yêu thích	Please check the popularity before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-9c019b7a1146	poster	POƱSTɝ	/ˈpoʊstɝ/	noun	một bức tranh in lớn hoặc thông báo dán trên tường	Please check the poster before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-a2da891a80d0	promptly	PɹⱭMPⱢI	/ˈpɹɑmpɫi/	adverb	thực hiện ngay lập tức, ngay lập tức	She responded promptly to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ad-777c-b0be-a68f8e82142e	retailer	ɹI-teɪɫɝ	/ˈɹiˌteɪɫɝ/	noun	một cửa hàng bán thứ gì đó	Please check the retailer before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ad-777c-b0be-a9cf94e9827e	bench	BƐNTƩ	/ˈbɛntʃ/	noun	một chỗ ngồi dài, thường là bằng gỗ, chủ yếu được tìm thấy trong công viên	Please check the bench before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ae-768c-bffc-b654fed10e24	cumulative	KJUMJƏⱢƏTꞮV	/ˈkjumjəɫətɪv/	adjective	trở nên lớn hơn bằng cách ngày càng được thêm vào	This is a cumulative solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ae-768c-bffc-ba9cf97088ae	directory	DAꞮ-ɹɛktɝi	/daɪˈɹɛktɝi/	noun	một danh sách tên và địa chỉ theo thứ tự bảng chữ cái	Please check the directory before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ae-768c-bffc-bc4bd3468579	disposal	DꞮ-spoʊzəɫ	/dɪˈspoʊzəɫ/	adjective	hành động loại bỏ một cái gì đó	This is a disposal solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ae-768c-bffc-c3872c550a05	housekeeper	HAƱ-skipɝ	/ˈhaʊˌskipɝ/	noun	một người có nhiệm vụ chăm sóc và dọn dẹp nhà cửa cho người khác	Please check the housekeeper before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ae-768c-bffc-c66e0e933b98	internship	ꞮNTɝN-ʃɪp	/ˈɪntɝnˌʃɪp/	noun	một vị trí hoặc vị trí để ai đó học một công việc thông qua công việc, đôi khi không được trả lương	Please check the internship before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7ae-768c-bffc-cbda8100c07f	knowledgeable	NⱭⱢƏDƷƏBƏⱢ	/ˈnɑɫədʒəbəɫ/	adjective	để biết nhiều về một chủ đề	This is a knowledgeable solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-3b22c8cedbe5	organizer	ƆɹꞬƏ-naɪzɝ	/ˈɔɹɡəˌnaɪzɝ/	noun	một người lên kế hoạch cho mọi thứ để kiếm sống	Please check the organizer before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-3ecee0e06dd4	overdue	OƱVɝ-du	/ˈoʊvɝˈdu/	noun	quá ngày bạn nên làm điều gì đó; trễ	Please check the overdue before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-439ea4747348	prediction	PɹI-dɪkʃən	/pɹiˈdɪkʃən/	noun	dự đoán về tương lai	Please check the prediction before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-46618818b4e8	subscriber	SƏBS-kɹaɪbɝ	/səbsˈkɹaɪbɝ/	noun	người trả tiền để nhận dịch vụ hoặc sản phẩm thường xuyên	Please check the subscriber before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7af-70bc-ad61-4a0c135ef77e	booklet	BƱKⱢꞮT	/ˈbʊkɫɪt/	noun	một cuốn sách nhỏ, tờ rơi hoặc sách quảng cáo	Please check the booklet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-4f043b557e09	conditioner	KƏN-dɪʃənɝ	/kənˈdɪʃənɝ/	noun	chất giống dầu gội đầu được sử dụng sau khi gội đầu	Please check the conditioner before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-5278c69d465e	enroll	ƐN-ɹoʊɫ	/ɛnˈɹoʊɫ/	noun	để đăng ký một cái gì đó	Please check the enroll before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7af-70bc-ad61-54aa6272877f	frustrate	FɹƏS-tɹeɪt	/ˈfɹəsˌtɹeɪt/	verb	đánh ng ai	They decided to frustrate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-838c920ecf43	garment	ꞬⱭɹMƏNT	/ˈɡɑɹmənt/	noun	một cái gì đó làm bằng vật liệu mà bạn có thể mặc, như quần hoặc váy	Please check the garment before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-84d9014b4e47	orientation	ƆɹIƐN-teɪʃən	/ˌɔɹiɛnˈteɪʃən/	noun	điều gì đó khiến bạn quen thuộc với một địa điểm	Please check the orientation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-88f61c531b7a	outlet	AƱT-ɫɛt	/ˈaʊtˌɫɛt/	noun	một cửa hàng bán đồ giảm giá	Please check the outlet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7b6-7777-b86b-8ef50fac5882	packet	PÆKƏT	/ˈpækət/	noun	một thùng carton nhỏ hoặc bao bì	Please check the packet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7b6-7777-b86b-90f4b75945e4	plumber	PⱢƏMɝ	/ˈpɫəmɝ/	noun	ai đó kết nối và sửa chữa đường ống nước để kiếm sống	Please check the plumber before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-9717b17e7815	specification	SPƐSꞮFꞮ-keɪʃən	/ˌspɛsɪfɪˈkeɪʃən/	noun	một chi tiết đặc biệt hoặc sự cần thiết cho một cái gì đó	Please check the specification before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-9974d81dc28a	auto	ƆTOƱ	/ˈɔtoʊ/	noun	xe	Please check the auto before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b6-7777-b86b-9fc194142033	decorate	DƐKɝ-eɪt	/ˈdɛkɝˌeɪt/	verb	làm cho hấp dẫn hơn bằng cách thêm trang trí, màu sắc, v.v.	They decided to decorate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-5480e21d992e	deduction	DꞮ-dəkʃən	/dɪˈdəkʃən/	noun	hành động lấy đi, thường là tiền	Please check the deduction before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-58c60164f466	definite	DƐFƏNƏT	/ˈdɛfənət/	noun	chắc chắn, chính xác	Please check the definite before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-5f7c58d50535	economical	ƐKƏ-nɑmɪkəɫ	/ˌɛkəˈnɑmɪkəɫ/	adjective	Giá trị tốt	This is a economical solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-613712de481d	efficiently	Ɪ-fɪʃəntɫi	/ɪˈfɪʃəntɫi/	adverb	làm tốt một việc gì đó trong một khoảng thời gian ngắn	She responded efficiently to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-6737b260ccb4	flyer	FⱢAꞮɝ	/ˈfɫaɪɝ/	noun	tờ rơi, tờ rơi	Please check the flyer before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-6b9bd6e951f3	franchise	FɹÆN-tʃaɪz	/ˈfɹænˌtʃaɪz/	verb	một trong nhiều chi nhánh của một doanh nghiệp bạn mua, ví dụ: KFC	They decided to franchise the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-6c54b39b9168	oven	ƏVƏN	/ˈəvən/	verb	thiết bị nhà bếp được sử dụng để nướng hoặc rang	They decided to oven the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-71114884b36e	pant	PÆNT	/ˈpænt/	adjective	hít thở sâu qua miệng, ầm ĩ	This is a pant solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b7-73d4-bc91-74c6d178e5a8	profitable	PɹⱭFƏTƏBƏⱢ	/ˈpɹɑfətəbəɫ/	adjective	kiếm tiền	This is a profitable solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7b8-75a3-9b2a-949819878777	refrigerator	ɹƏ-fɹɪdʒɝ-eɪtɝ	/ɹəˈfɹɪdʒɝˌeɪtɝ/	noun	một hộp điện làm mát thực phẩm	Please check the refrigerator before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-980e59883234	reimburse	ɹIꞮM-bɝs	/ˌɹiɪmˈbɝs/	noun	trả lại tiền cho một khoản chi phí đã được thanh toán	Please check the reimburse before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7b8-75a3-9b2a-9d05998e9d57	showroom	ƩOƱ-ɹum	/ˈʃoʊˌɹum/	noun	một khu vực nơi hàng hóa để bán được đặt ra để mọi người có thể nhìn vào chúng	Please check the showroom before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7b8-75a3-9b2a-a39c44a7e786	vegetarian	VƐDƷƏ-tɛ-ɹiən	/ˌvɛdʒəˈtɛˌɹiən/	noun	người không ăn thịt hoặc cá	Please check the vegetarian before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-a4b458707653	administrator	ƏD-mɪnə-stɹeɪtɝ	/ədˈmɪnəˌstɹeɪtɝ/	noun	người quản lý một văn phòng	Please check the administrator before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7b8-75a3-9b2a-a93b0582a33b	broker	BɹOƱKɝ	/ˈbɹoʊkɝ/	noun	một người mua và bán thứ cho một tỷ lệ phần trăm của doanh số bán hàng	Please check the broker before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7b8-75a3-9b2a-af86383b6ae1	cancellation	KÆNSƏ-ɫeɪʃən	/ˌkænsəˈɫeɪʃən/	noun	khi một cái gì đó sẽ không xảy ra sau khi tất cả	Please check the cancellation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-b34fad5ff490	confidential	KⱭNFƏ-dɛnʃəɫ	/ˌkɑnfəˈdɛnʃəɫ/	adjective	điều gì đó cần được giữ bí mật	This is a confidential solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-b691ddf1d371	jet	DƷƐT	/ˈdʒɛt/	noun	máy bay	Please check the jet before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-ba9fd11a15a7	realistic	ɹIƏ-ɫɪstɪk	/ˌɹiəˈɫɪstɪk/	noun	hợp lý hoặc gần gũi với cuộc sống thực	Please check the realistic before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-bf23836b7de3	thoroughly	ΘɝOƱⱢI	/ˈθɝoʊɫi/	adverb	làm điều gì đó cẩn thận với sự chú ý đến từng chi tiết	She responded thoroughly to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-c36f642b1677	trash	TɹÆƩ	/ˈtɹæʃ/	noun	rác hoặc chất thải; một cái gì đó vô giá trị	Please check the trash before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-c78abc6958e0	usage	JUSƏDƷ	/ˈjusədʒ/	noun	cách thông thường hoặc theo thông lệ mà một cái gì đó được sử dụng	Please check the usage before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b8-75a3-9b2a-c9e36348fbb4	windy	WAꞮNDI	/ˈwaɪndi/	noun	thời tiết giông bão hoặc gió mạnh	Please check the windy before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-8eb5d4129adf	automate	ƆTƏ-meɪt	/ˈɔtəˌmeɪt/	verb	Để thực hiện một quy trình thực hiện một nhiệm vụ lặp đi lặp lại bằng máy	They decided to automate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-938256e5b3be	ferry	FƐɹI	/ˈfɛɹi/	noun	một chiếc thuyền lớn chở người và xe hơi	Please check the ferry before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-957c8f1849ea	finalize	FAꞮNƏ-ɫaɪz	/ˈfaɪnəˌɫaɪz/	verb	để đưa ra quyết định cuối cùng	They decided to finalize the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-99597939d013	incur	ꞮN-kɝ	/ˌɪnˈkɝ/	noun	đặt mình mở ra cho một cái gì đó như là kết quả của hành động của bạn	Please check the incur before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-9d722d3ae2ac	instruct	ꞮN-stɹəkt	/ˌɪnˈstɹəkt/	noun	để giảng dạy	Please check the instruct before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-a2bd23dd5dd4	loyal	ⱢƆꞮƏⱢ	/ˈɫɔɪəɫ/	adjective	sống chân thật hoặc trung thành	This is a loyal solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-a625f7cc9c2d	luncheon	ⱢƏNTƩƏN	/ˈɫəntʃən/	noun	một bữa ăn chính thức được ăn vào giữa ngày	Please check the luncheon before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-a97abd42744a	microphone	MAꞮKɹƏ-foʊn	/ˈmaɪkɹəˌfoʊn/	noun	thiết bị được ca sĩ và diễn giả công cộng sử dụng để làm cho giọng nói của họ to hơn	Please check the microphone before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-ae4c688cc56e	overview	OƱVɝV-ju	/ˈoʊvɝvˌju/	noun	một bản tóm tắt chung về một chủ đề	Please check the overview before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-b20ef2aef68f	projector	PɹƏ-dʒɛktɝ	/pɹəˈdʒɛktɝ/	noun	một thiết bị quang học chiếu hình ảnh phóng to lên màn hình	Please check the projector before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-b4ea9d2f9fad	shortage	ƩƆɹTƏDƷ	/ˈʃɔɹtədʒ/	noun	thiếu một cái gì đó	Please check the shortage before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7b9-751d-afbf-bb1db6b73198	spacious	SPEꞮƩƏS	/ˈspeɪʃəs/	adjective	rất nhiều phòng hoặc không gian	This is a spacious solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8161-f9cba766751b	accomplishment	Ə-kɑmpɫɪʃmənt	/əˈkɑmpɫɪʃmənt/	noun	điều gì đó bạn đạt được	Please check the accomplishment before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8161-fe88d2d574fc	accustom	Ə-kəstəm	/əˈkəstəm/	noun	để làm quen với	Please check the accustom before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-018626976bd4	clinic	KⱢꞮNꞮK	/ˈkɫɪnɪk/	noun	một nơi bạn đến khi bị bệnh, giống như một bệnh viện nhỏ	Please check the clinic before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-04dbe487750f	desktop	DƐSK-tɑp	/ˈdɛskˌtɑp/	noun	khu vực làm việc của màn hình máy tính khi không có chương trình nào đang mở	Please check the desktop before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-081dad310f29	jog	DƷⱭꞬ	/ˈdʒɑɡ/	noun	chạy nhẹ nhàng	Please check the jog before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-0c73dce6a3ef	leisure	ⱢƐƷɝ	/ˈɫɛʒɝ/	noun	một cái gì đó để vui chơi hoặc thư giãn	Please check the leisure before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-10c30cf81ac4	reinforce	ɹIꞮN-fɔɹs	/ˌɹiɪnˈfɔɹs/	noun	để làm cho mạnh hơn	Please check the reinforce before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-147d291c0c80	sender	SƐNDɝ	/ˈsɛndɝ/	noun	người truyền tải thông điệp	Please check the sender before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-188e522a44f1	vacuum	VÆKJUM	/ˈvækjum/	noun	không gian trống hoàn toàn	Please check the vacuum before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-1f3820707b07	wireless	WAꞮɹⱢꞮS	/ˈwaɪɹɫɪs/	adjective	một phương tiện liên lạc sử dụng sóng vô tuyến thay vì dây dẫn	This is a wireless solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-210fe26a3531	yearly	JꞮɹⱢI	/ˈjɪɹɫi/	adverb	xảy ra 12 tháng một lần	She responded yearly to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-259355c66ae1	appreciation	Ə-pɹiʃi-eɪʃən	/əˌpɹiʃiˈeɪʃən/	noun	để cảm ơn về điều gì đó hoặc ai đó	Please check the appreciation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-29cf1e96d667	cargo	KⱭɹ-ɡoʊ	/ˈkɑɹˌɡoʊ/	noun	những thứ được mang trong khoang máy bay hoặc trên xe tải	Please check the cargo before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7ba-7746-8162-2e9cf0512339	cooperate	KWⱭPɝ-eɪt	/ˈkwɑpɝˌeɪt/	verb	để làm việc cùng nhau một cách độc đáo	They decided to cooperate the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7ba-7746-8162-312432325eb4	distract	DꞮ-stɹækt	/dɪˈstɹækt/	noun	để lấy đi sự tập trung của bạn khỏi một cái gì đó	Please check the distract before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-371022b301e9	dividend	DꞮVꞮ-dɛnd	/ˈdɪvɪˌdɛnd/	noun	tiền nhận được dưới dạng tiền thưởng	Please check the dividend before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ba-7746-8162-39229f007d89	exemption	ꞮꞬ-zɛmpʃən	/ɪɡˈzɛmpʃən/	noun	một ngoại lệ cho quy tắc	Please check the exemption before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-2d79de9cdcb6	furnish	FɝNꞮƩ	/ˈfɝnɪʃ/	noun	để đặt đồ đạc vào	Please check the furnish before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-332d96847856	hourly	AƱɹⱢI	/ˈaʊɹɫi/	adverb	xảy ra mỗi 60 phút	She responded hourly to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-340f99af22db	laundry	ⱢƆNDɹI	/ˈɫɔndɹi/	noun	quần áo bẩn cần giặt	Please check the laundry before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-38a506403b83	mandatory	MÆNDƏ-tɔɹi	/ˈmændəˌtɔɹi/	noun	điều gì đó phải được thực hiện	Please check the mandatory before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-3e2cde2eafe2	mechanical	MƏ-kænɪkəɫ	/məˈkænɪkəɫ/	adjective	liên quan đến máy móc	This is a mechanical solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-43e946f196ed	pharmacy	FⱭɹMƏSI	/ˈfɑɹməsi/	noun	một cửa hàng nơi thuốc được chuẩn bị và bán	Please check the pharmacy before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-45fb6b3efa9d	promotional	Pɝ-moʊʃənəɫ	/pɝˈmoʊʃənəɫ/	adjective	liên quan đến việc khuyến khích bán hàng	This is a promotional solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7bb-7431-b23d-49cfbbb857d3	quarterly	KWƆɹTɝⱢI	/ˈkwɔɹtɝɫi/	adverb	4 tháng/ lần	She responded quarterly to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-4cbef794a037	residential	ɹƐZꞮ-dɛnʃəɫ	/ˌɹɛzɪˈdɛnʃəɫ/	adjective	một khu vực nơi mọi người sinh sống	This is a residential solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-518c2e2d446a	scholarship	SKⱭⱢɝ-ʃɪp	/ˈskɑɫɝˌʃɪp/	noun	một khoản tiền được trao cho một sinh viên có khả năng để giúp chi trả cho việc học của họ	Please check the scholarship before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7bb-7431-b23d-555fa5776832	seeker	SIKɝ	/ˈsikɝ/	noun	ai đó đang tìm kiếm thứ gì đó	Please check the seeker before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-58a788a9dd9d	temporarily	TƐMPɝ-ɛɹəɫi	/ˌtɛmpɝˈɛɹəɫi/	adverb	không bao giờ, trong một thời gian ngắn	She responded temporarily to the client's request.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-5d77a960e304	towel	TAƱƏⱢ	/ˈtaʊəɫ/	noun	một miếng vải lớn được sử dụng để sấy khô sau khi tắm hoặc bơi	Please check the towel before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-6172a824899c	unattended	ƏNƏ-tɛndɪd	/ənəˈtɛndɪd/	verb	khi ai đó hoặc thứ gì đó không được theo dõi	They decided to unattended the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e7bb-7431-b23d-6505c683cc6e	accessible	ÆK-sɛsəbəɫ	/ækˈsɛsəbəɫ/	adjective	có sẵn, dễ tiếp cận	This is a accessible solution for our team.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-68cc8adf1c0a	afterward	ÆFTɝWɝD	/ˈæftɝwɝd/	noun	sau một sự kiện hoặc hành động	Please check the afterward before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bb-7431-b23d-6d57cababa11	apology	Ə-pɑɫə-dʒi	/əˈpɑɫəˌdʒi/	noun	nói rằng bạn xin lỗi về điều gì đó	Please check the apology before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bc-7045-b773-32a54ac878dd	automatic	ƆTƏ-mætɪk	/ˌɔtəˈmætɪk/	noun	hoàn thành mà không cần suy nghĩ	Please check the automatic before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7bc-7045-b773-3462e0e6417b	boardroom	BƆɹ-dɹum	/ˈbɔɹˌdɹum/	noun	một căn phòng nơi hội đồng quản trị của một công ty tổ chức các cuộc họp	Please check the boardroom before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c2-7263-bfae-5adf844abb07	carpenter	KⱭɹPƏNTɝ	/ˈkɑɹpəntɝ/	noun	một người làm và sửa chữa những thứ làm bằng gỗ để kiếm sống	Please check the carpenter before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c2-7263-bfae-5f6ff5262a7d	caterer	KEꞮTɝɝ	/ˈkeɪtɝɝ/	noun	người làm ra thức ăn và cung cấp nó để kiếm sống	Please check the caterer before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7c2-7263-bfae-61b1a01f25bd	classify	KⱢÆSƏ-faɪ	/ˈkɫæsəˌfaɪ/	verb	đưa vào một danh mục	They decided to classify the plan after the review.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c2-7263-bfae-64fa40af5ef8	consultation	KⱭNSƏⱢ-teɪʃən	/ˌkɑnsəɫˈteɪʃən/	noun	một cuộc gặp gỡ giữa hai người	Please check the consultation before the meeting.	\N	medium	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c2-7263-bfae-69b797e7560f	durable	DƱɹƏBƏⱢ	/ˈdʊɹəbəɫ/	adjective	rất lâu	This is a durable solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c2-7263-bfae-6d7ae721b2d1	glove	ꞬⱢƏV	/ˈɡɫəv/	noun	thứ gì đó bạn đeo trên tay để giữ ấm	Please check the glove before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-d0693fe667ee	hardware	HⱭɹD-wɛɹ	/ˈhɑɹdˌwɛɹ/	noun	dụng cụ hoặc thiết bị	Please check the hardware before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-d5da32868cf0	malfunction	MÆⱢ-fəŋkʃən	/mæɫˈfəŋkʃən/	noun	sự cố hoặc hỏng hóc trong hệ thống	Please check the malfunction before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-d923ddf76bed	outdated	AƱT-deɪtɪd	/ˈaʊtˌdeɪtɪd/	verb	lớn hơn	They decided to outdated the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-de73e718ceda	patience	PEꞮƩƏNS	/ˈpeɪʃəns/	noun	chấp nhận đau khổ mà không tức giận	Please check the patience before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-e16ed369bf75	postcard	POƱ-skɑɹd	/ˈpoʊˌskɑɹd/	noun	một thẻ để gửi tin nhắn qua đường bưu điện mà không có phong bì	Please check the postcard before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-e74149cb9612	prospective	PɹƏ-spɛktɪv	/pɹəˈspɛktɪv/	adjective	có thể trong tương lai, ví dụ: khách hàng tiềm năng	This is a prospective solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7c3-70a0-8fd0-e9869265309a	revision	ɹI-vɪʒən	/ɹiˈvɪʒən/	noun	để thay đổi hoặc viết lại một cái gì đó	Please check the revision before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-ed42aa100209	strictly	STɹꞮKTⱢI	/ˈstɹɪktɫi/	adverb	một cách mạnh mẽ, theo cách tuân thủ các quy tắc	She responded strictly to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-f03f63d26434	tomato	TƏ-mɑ-toʊ	/təˈmɑˌtoʊ/	noun	một loại trái cây tròn màu đỏ, thường được coi là một loại rau	Please check the tomato before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c3-70a0-8fd0-f467e437316c	tray	TɹEꞮ	/ˈtɹeɪ/	noun	một chiếc đĩa phẳng dùng để đựng đồ, thường là cà phê hoặc trà	Please check the tray before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7c3-70a0-8fd0-fbe1d63d9d95	vendor	VƐNDɝ	/ˈvɛndɝ/	noun	người đang bán thứ gì đó	Please check the vendor before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-9758e0e54a48	withdrawal	WꞮÐ-dɹɔəɫ	/wɪðˈdɹɔəɫ/	adjective	hành động lấy đi một cái gì đó hoặc ra khỏi một cái gì đó, ví dụ như rút tiền từ ngân hàng	This is a withdrawal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7c4-736a-a8bf-98dff4ffc1c3	anytime	ƐNI-taɪm	/ˈɛniˌtaɪm/	noun	tại một thời điểm bạn chọn, điều đó không quan trọng khi	Please check the anytime before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-9d0adfa3e8dd	badge	BÆDƷ	/ˈbædʒ/	noun	một mảnh vật liệu nhỏ có tên và thông tin chi tiết của bạn mà bạn mặc để cho thấy bạn là ai	Please check the badge before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-a15b6bab3cdf	brake	BɹEꞮK	/ˈbɹeɪk/	noun	để dừng xe bằng cách nhấn bàn đạp	Please check the brake before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-a656a68ca837	calculation	KÆⱢKJƏ-ɫeɪʃən	/ˌkæɫkjəˈɫeɪʃən/	noun	để cộng, trừ, nhân, chia, v.v.	Please check the calculation before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-abfc70a1154a	coordinator	KOƱ-ɔɹdə-neɪtɝ	/koʊˈɔɹdəˌneɪtɝ/	noun	một người có nhiệm vụ tổ chức mọi thứ	Please check the coordinator before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-ad79f7ca0e25	costly	KⱭSTⱢI	/ˈkɑstɫi/	adverb	đắt tiền, có giá cao	She responded costly to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7c4-736a-a8bf-b3437863579d	equip	Ɪ-kwɪp	/ɪˈkwɪp/	noun	cung cấp khả năng hoặc công cụ	Please check the equip before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-b59aa978d889	excursion	ꞮK-skɝʒən	/ɪkˈskɝʒən/	noun	một cuộc hành trình được thực hiện vì niềm vui	Please check the excursion before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-b9fb7ecc8f40	graphic	ꞬɹÆFꞮK	/ˈɡɹæfɪk/	noun	để làm với một hình ảnh hoặc hình ảnh	Please check the graphic before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c4-736a-a8bf-bfe0721194c1	inexperience	ꞮNꞮK-spɪɹiəns	/ˌɪnɪkˈspɪɹiəns/	noun	không thực hành nhiều với một cái gì đó	Please check the inexperience before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-a6a2c1655dda	lengthy	ⱢƐŊΘI	/ˈɫɛŋθi/	noun	lâu dài về thời gian hoặc kích thước	Please check the lengthy before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-aa6665d8013a	librarian	ⱢAꞮ-bɹɛ-ɹiən	/ɫaɪˈbɹɛˌɹiən/	noun	một người làm việc với sách trong thư viện	Please check the librarian before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-aded365e3fed	meantime	MIN-taɪm	/ˈminˌtaɪm/	noun	thời gian giữa hai sự kiện	Please check the meantime before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-b202d95c6f04	merge	MɝDƷ	/ˈmɝdʒ/	noun	kết hợp hai thứ lại với nhau để tạo thành một	Please check the merge before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-b43fead80707	performer	Pɝ-fɔɹmɝ	/pɝˈfɔɹmɝ/	noun	một nghệ sĩ giải trí như một diễn viên hay một ca sĩ	Please check the performer before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-bb726fe99d1d	pharmacist	FⱭɹMƏSꞮST	/ˈfɑɹməsɪst/	noun	một người có nhiệm vụ chuẩn bị thuốc	Please check the pharmacist before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-be6cd54c4c96	pizza	PITSƏ	/ˈpitsə/	noun	một miếng bột nhào nướng tròn, phủ cà chua, phô mai và các thành phần khác	Please check the pizza before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-c254b7c1d4c9	resignation	ɹƐZƏꞬ-neɪʃən	/ˌɹɛzəɡˈneɪʃən/	noun	bỏ việc	Please check the resignation before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	hr
01a0aec8-e7c5-7303-a453-c65f3c327378	reviewer	ɹIV-juɝ	/ɹivˈjuɝ/	noun	người kiểm tra công việc bằng văn bản	Please check the reviewer before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c5-7303-a453-cb8405e3dc83	terminate	TɝMƏ-neɪt	/ˈtɝməˌneɪt/	verb	kết thúc	They decided to terminate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-0f573330b040	translation	TɹÆN-sɫeɪʃən	/tɹænˈsɫeɪʃən/	noun	một cái gì đó được thay đổi thành ngôn ngữ khác	Please check the translation before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-12cd9ea7f9b7	unfamiliar	ƏNFƏ-mɪɫjɝ	/ˌənfəˈmɪɫjɝ/	noun	nồi tiếng	Please check the unfamiliar before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-16fa833347ae	actress	ÆKTɹƏS	/ˈæktɹəs/	noun	một nữ diễn viên	Please check the actress before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-1b84981966b3	adjacent	Ə-dʒeɪsənt	/əˈdʒeɪsənt/	adjective	bên cạnh, bên cạnh	This is a adjacent solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-1c7dd36a1e3e	alternate	ƆⱢTɝ-neɪt	/ˈɔɫtɝˌneɪt/	verb	Thêm tùy chọn khác	They decided to alternate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-2176a1f90af0	congratulate	KƏN-ɡɹætʃə-ɫeɪt	/kənˈɡɹætʃəˌɫeɪt/	verb	nói với ai đó 'làm tốt lắm' trong một dịp vui	They decided to congratulate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-255a561876d7	escort	ƐSKƆɹT	/ˈɛskɔɹt/	noun	rủi cho ai, không lợi cho ai	Please check the escort before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-2b8444fbda32	inexpensive	ꞮNꞮK-spɛnsɪv	/ˌɪnɪkˈspɛnsɪv/	adjective	có giá rẻ; giá rẻ	This is a inexpensive solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7c6-77a3-a1ae-2d339186c85e	mask	MÆSK	/ˈmæsk/	noun	thứ gì đó che mặt bạn	Please check the mask before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c6-77a3-a1ae-31ecd125cc6e	purchaser	PɝTƩƏSɝ	/ˈpɝtʃəsɝ/	noun	ai đó mua đồ; người mua	Please check the purchaser before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-1d6118a0b1a7	purse	PɝS	/ˈpɝs/	noun	một chiếc túi nhỏ mà phụ nữ sử dụng để mang theo vật dụng cá nhân	Please check the purse before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-233111cc94d0	realtor	ɹIƏⱢTɝ	/ˈɹiəɫtɝ/	noun	một người bán, cho thuê hoặc quản lý tài sản để kiếm sống	Please check the realtor before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-24e40674a870	rearrange	ɹIɝ-eɪndʒ	/ˌɹiɝˈeɪndʒ/	noun	đưa vào một đơn đặt hàng mới	Please check the rearrange before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-29da5a2d11dc	reopen	ɹI-oʊpən	/ɹiˈoʊpən/	verb	để mở lại	They decided to reopen the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-2e4407163904	soap	SOƱP	/ˈsoʊp/	noun	một khối vật liệu được sử dụng để giặt hoặc làm sạch	Please check the soap before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-31caecc17bea	spokesperson	SPOƱKSPɝSƏN	/ˈspoʊkspɝsən/	noun	một người đàn ông hoặc phụ nữ nói chính thức cho phần còn lại của nhóm	Please check the spokesperson before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-3556ea84fcef	superior	SU-pɪɹiɝ	/suˈpɪɹiɝ/	noun	người lãnh đạo, một người có cấp bậc cao hơn bạn	Please check the superior before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-38d84052dc34	airfare	Ɛɹ-fɛɹ	/ˈɛɹˌfɛɹ/	noun	số tiền phải trả cho việc di chuyển bằng máy bay	Please check the airfare before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-3f67cfb2bed1	bake	BEꞮK	/ˈbeɪk/	noun	để nấu những thứ bên trong lò	Please check the bake before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c7-726a-8b17-40c1d6c86cfd	businessperson	BꞮZNƏ-spɝsən	/ˈbɪznəˈspɝsən/	noun	một người làm việc trong lĩnh vực kinh doanh thương mại hoặc công nghiệp, đặc biệt là chủ sở hữu hoặc người điều hành	Please check the businessperson before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c8-7035-bf68-78fd1001df22	considerably	KƏN-sɪdɝəbɫi	/kənˈsɪdɝəbɫi/	adverb	ở một mức độ lớn	She responded considerably to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c8-7035-bf68-7ee15c25bd66	faulty	FƆⱢTI	/ˈfɔɫti/	noun	hỏng, không hoàn hảo	Please check the faulty before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c8-7035-bf68-8020ac775373	hobby	HⱭBI	/ˈhɑbi/	noun	điều gì đó bạn làm trong thời gian rảnh rỗi để giải trí	Please check the hobby before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c8-7035-bf68-841597a1955f	informal	ꞮN-fɔɹməɫ	/ˌɪnˈfɔɹməɫ/	adjective	thoải mái, bình thường - thường được sử dụng để mô tả quần áo hoặc một sự kiện	This is a informal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7c8-7035-bf68-89f070aa2fb5	kilometer	KꞮⱢƏ-mitɝ	/ˈkɪɫəˌmitɝ/	noun	một đơn vị hệ mét có chiều dài bằng 1000 mét	Please check the kilometer before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ce-716f-b5da-6c0780a0b74a	lawn	ⱢƆN	/ˈɫɔn/	noun	khu vực có cỏ trong vườn của bạn	Please check the lawn before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ce-716f-b5da-71fad6c3be46	microscope	MAꞮKɹƏ-skoʊp	/ˈmaɪkɹəˌskoʊp/	noun	một thiết bị làm cho những thứ rất nhỏ trông lớn hơn để bạn có thể nghiên cứu chúng kỹ hơn	Please check the microscope before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ce-716f-b5da-745d4f0d6a95	mislead	MꞮ-sɫid	/mɪˈsɫid/	noun	dẫn một người nào đó theo hướng sai hoặc cho ai đó hướng sai.	Please check the mislead before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ce-716f-b5da-78387efd2d0b	misplace	MꞮS-pɫeɪs	/mɪsˈpɫeɪs/	noun	Bạn quên đã cất ở đâu	Please check the misplace before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-b7a8ac065b16	newsstand	NUZ-stænd	/ˈnuzˌstænd/	noun	một cấu trúc nhỏ nơi bán báo và tạp chí	Please check the newsstand before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-bb72efde8817	overhead	OƱVɝ-hɛd	/ˈoʊvɝˈhɛd/	noun	chi phí cố định của một doanh nghiệp, ví dụ: tiền thuê nhà	Please check the overhead before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7cf-75c4-a566-be67a6fc7179	portfolio	PƆɹT-foʊɫi-oʊ	/pɔɹtˈfoʊɫiˌoʊ/	noun	một tập hợp các khoản đầu tư mà ai đó sở hữu	Please check the portfolio before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-c04b31100743	rack	ɹÆK	/ˈɹæk/	noun	giá đỡ hoặc kệ để đặt đồ lên	Please check the rack before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-b435fb75b1c9	closure	KⱢOƱƷɝ	/ˈkɫoʊʒɝ/	noun	khi một cái gì đó được đóng lại vĩnh viễn	Please check the closure before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-c56af42d3b82	remodel	ɹI-mɑdəɫ	/ɹiˈmɑdəɫ/	noun	thay đổi hoặc thay đổi gần như mọi thứ để làm cho nó trông khác biệt	Please check the remodel before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-ca5fd6def0c7	statistics	STƏ-tɪstɪks	/stəˈtɪstɪks/	noun	toán học liên quan đến thu thập dữ liệu	Please check the statistics before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-cd4d978ee98c	tunnel	TƏNƏⱢ	/ˈtənəɫ/	noun	một cái lỗ mà người ta có thể chui qua	Please check the tunnel before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-d27b17c30b3d	unlimited	ƏN-ɫɪmətɪd	/ənˈɫɪmətɪd/	verb	không bao giờ hết	They decided to unlimited the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-d79262a053c9	vitamin	VAꞮTƏMƏN	/ˈvaɪtəmən/	noun	một chất tự nhiên có trong thực phẩm và đồ uống mà cơ thể bạn cần phải khỏe mạnh	Please check the vitamin before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-d94d8bdd7af0	zoo	ZU	/ˈzu/	noun	một công viên nơi lưu giữ nhiều loại động vật sống khác nhau	Please check the zoo before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7cf-75c4-a566-dfbcc0288b69	alert	Ə-ɫɝt	/əˈɫɝt/	noun	tỉnh táo, nhận thức được	Please check the alert before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-546b7919e346	auditorium	ƆDƏ-tɔɹiəm	/ˌɔdəˈtɔɹiəm/	noun	khu vực của nhà hát hoặc phòng hòa nhạc nơi khán giả ngồi	Please check the auditorium before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-598fbd362b57	celebrity	SƏ-ɫɛbɹɪti	/səˈɫɛbɹɪti/	noun	<g id="1">-NGƯỜI NÀO </g>NỔI TIẾNG	Please check the celebrity before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-5db9778ed55c	deduct	DꞮ-dəkt	/dɪˈdəkt/	noun	để trừ hoặc lấy đi	Please check the deduct before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-61335406f737	disruption	DꞮS-ɹəpʃən	/dɪsˈɹəpʃən/	noun	hành động làm gián đoạn và gây hỗn loạn	Please check the disruption before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-6779477d6158	electrician	ꞮⱢƐK-tɹɪʃən	/ɪɫɛkˈtɹɪʃən/	noun	người lắp đặt hoặc sửa chữa đường dây điện hoặc điện thoại	Please check the electrician before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e7d0-7004-8577-6b4a697a26a0	enthusiastic	ꞮN-θuzi-æstɪk	/ɪnˌθuziˈæstɪk/	noun	để thể hiện sự phấn khích về điều gì đó	Please check the enthusiastic before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-6c8b5690f200	graduation	ꞬɹÆDƷƏ-weɪʃən	/ˌɡɹædʒəˈweɪʃən/	noun	buổi lễ khi hoàn thành bằng cấp hoặc chương trình	Please check the graduation before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-71f7266ae7f9	icy	AꞮSI	/ˈaɪsi/	noun	làm bằng đá	Please check the icy before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-75f807db85d5	irregular	Ɪ-ɹɛɡjəɫɝ	/ˌɪˈɹɛɡjəɫɝ/	noun	xảy ra vào những thời điểm bất ngờ	Please check the irregular before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d0-7004-8577-7bb755d7532c	login	ⱢƆ-ɡɪn	/ˈɫɔˌɡɪn/	noun	để nhập tài khoản trang web máy tính	Please check the login before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d1-77b1-abaf-18ba792245eb	managerial	MÆNꞮ-dʒɪɹiəɫ	/ˌmænɪˈdʒɪɹiəɫ/	adjective	liên quan đến quản lý hoặc giám sát	This is a managerial solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7d1-77b1-abaf-1c3fef02e71b	mineral	MꞮNɝƏⱢ	/ˈmɪnɝəɫ/	adjective	một loại chất được tìm thấy trong tự nhiên	This is a mineral solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d1-77b1-abaf-237f0f5b6f5f	motorcycle	MOƱTɝ-saɪkəɫ	/ˈmoʊtɝˌsaɪkəɫ/	noun	một chiếc xe cơ giới có hai bánh và khung chắc chắn	Please check the motorcycle before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d1-77b1-abaf-26d16bbb4772	necessity	NƏ-sɛsəti	/nəˈsɛsəti/	noun	một cái gì đó mà bạn cần	Please check the necessity before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d1-77b1-abaf-2b522dc737e1	planner	PⱢÆNɝ	/ˈpɫænɝ/	noun	một người lập kế hoạch	Please check the planner before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d1-77b1-abaf-2ef98d7536f7	programmer	PɹOƱ-ɡɹæmɝ	/ˈpɹoʊˌɡɹæmɝ/	noun	một người thiết kế, viết và kiểm tra các chương trình máy tính	Please check the programmer before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-323a42c527ef	proofread	PɹU-fɹid	/ˈpɹuˌfɹid/	noun	đọc để tìm lỗi	Please check the proofread before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-358aadc9dae9	recruiter	ɹꞮ-kɹutɝ	/ɹɪˈkɹutɝ/	noun	một người thuê người cho các doanh nghiệp	Please check the recruiter before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	hr
01a0aec8-e7d2-7010-beaa-3ac60969d09b	remainder	ɹI-meɪndɝ	/ɹiˈmeɪndɝ/	noun	những gì còn lại	Please check the remainder before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-3e31f381daf4	statue	STÆ-tʃu	/ˈstæˌtʃu/	noun	một tác phẩm nghệ thuật, thường là một mô hình của một người hoặc động vật, được làm từ vật liệu cứng	Please check the statue before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-41ef2153dc6f	steadily	STƐDƏⱢI	/ˈstɛdəɫi/	adverb	một cách chậm rãi và đồng đều	She responded steadily to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-45885214c121	stockholder	STⱭK-hoʊɫdɝ	/ˈstɑkˌhoʊɫdɝ/	noun	người nắm giữ cổ phần trong một công ty	Please check the stockholder before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7d2-7010-beaa-4b13d4ef8d38	vacant	VEꞮKƏNT	/ˈveɪkənt/	adjective	trống, rỗng; uống, làm cạn	This is a vacant solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-4e9c54c496f2	accessory	ÆK-sɛsɝi	/ækˈsɛsɝi/	noun	đối tác phạm tội	Please check the accessory before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-50d9b0497132	assembly	Ə-sɛmbɫi	/əˈsɛmbɫi/	adverb	khi mọi người tụ tập lại với nhau	She responded assembly to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-55f2852343c1	basket	BÆSKƏT	/ˈbæskət/	noun	một thùng chứa làm bằng những mảnh gỗ	Please check the basket before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d2-7010-beaa-5a04bd01c19f	certification	SɝTƏFƏ-keɪʃən	/ˌsɝtəfəˈkeɪʃən/	noun	bằng chứng bằng văn bản rằng bạn đã làm điều gì đó hoặc điều gì đó đủ tốt	Please check the certification before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-b8a176e26312	dislike	DꞮ-sɫaɪk	/dɪˈsɫaɪk/	noun	không thích, ghét	Please check the dislike before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-bfcef8ecb27f	downstairs	DAƱN-stɛɹz	/ˈdaʊnˈstɛɹz/	noun	ở tầng dưới của tòa nhà	Please check the downstairs before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-c0005e9591bf	expiration	ƐKSPɝ-eɪʃən	/ˌɛkspɝˈeɪʃən/	noun	kết thúc một khoảng thời gian	Please check the expiration before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-c5043d770671	headache	HƐ-deɪk	/ˈhɛˌdeɪk/	noun	đau đầu	Please check the headache before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-c97a84ed8cc6	jam	DƷÆM	/ˈdʒæm/	noun	ấn mạnh xuống	Please check the jam before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-ce3413093eb5	nail	NEꞮⱢ	/ˈneɪɫ/	noun	một miếng kim loại dài, mỏng được sử dụng để giữ các mảnh gỗ lại với nhau được đập bằng búa	Please check the nail before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-d2460669dda5	optimistic	ⱭPTƏ-mɪstɪk	/ˌɑptəˈmɪstɪk/	noun	lạc quan về tương lai	Please check the optimistic before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d3-7452-9ff2-d508a7131d35	pedestrian	PƏ-dɛstɹiən	/pəˈdɛstɹiən/	noun	một người đang đi bộ trên đường phố	Please check the pedestrian before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-a72c43dad9f2	projection	PɹƏ-dʒɛkʃən	/pɹəˈdʒɛkʃən/	noun	dự đoán về các sự kiện trong tương lai, ví dụ: doanh thu hoặc thu nhập	Please check the projection before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7d4-7710-9a92-aa2898ecb805	sleeve	SⱢIV	/ˈsɫiv/	noun	phần quần áo che một phần hoặc toàn bộ cánh tay	Please check the sleeve before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-adf123f5bbcb	suburb	SƏBɝB	/ˈsəbɝb/	noun	khu vực sinh sống bên ngoài thành phố	Please check the suburb before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-b0b123d672c3	takeover	TEꞮ-koʊvɝ	/ˈteɪˌkoʊvɝ/	noun	việc mua lại một công ty bởi một công ty khác	Please check the takeover before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-b6348df5f892	unsure	ƏN-ʃʊɹ	/ənˈʃʊɹ/	noun	không chắc chắn hoặc không chắc chắn	Please check the unsure before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-b973682e339f	upstairs	ƏP-stɛɹz	/əpˈstɛɹz/	noun	ở tầng cao hơn của tòa nhà	Please check the upstairs before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-bc40418ebc5f	verbal	VɝBƏⱢ	/ˈvɝbəɫ/	adjective	được nói	This is a verbal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7d4-7710-9a92-c05da0026b68	visa	VIZƏ	/ˈvizə/	noun	giấy phép du lịch cho phép bạn nhập cảnh vào một quốc gia cụ thể trong một khoảng thời gian	Please check the visa before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7da-770b-ba76-486ac4a8467e	wildlife	WAꞮⱢD-ɫaɪf	/ˈwaɪɫdˌɫaɪf/	noun	động vật và thực vật sống trong thế giới tự nhiên	Please check the wildlife before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-a710282f94c2	workforce	WɝK-fɔɹs	/ˈwɝkˌfɔɹs/	noun	tất cả những người mà một công ty tuyển dụng	Please check the workforce before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-a8c30a485883	absent	ÆBSƏNT	/ˈæbsənt/	adjective	mất tích, không có mặt	This is a absent solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	meetings
01a0aec8-e7db-704f-8b82-ae60bc0a003e	accumulate	ƏK-jumjə-ɫeɪt	/əkˈjumjəˌɫeɪt/	verb	để từ từ nhận được nhiều hơn và nhiều hơn nữa của một cái gì đó, ví dụ như sự giàu có	They decided to accumulate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-b3d850dcf6c5	appraisal	Ə-pɹeɪzəɫ	/əˈpɹeɪzəɫ/	adjective	Đánh Giá	This is a appraisal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-b4f8ed29f265	apprentice	Ə-pɹɛntəs	/əˈpɹɛntəs/	noun	một người đang học giao dịch bằng cách làm việc với một chuyên gia	Please check the apprentice before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-b8e0c6e57dd4	businessman	BꞮZNƏS-mæn	/ˈbɪznəsˌmæn/	noun	một người đàn ông làm việc trong lĩnh vực kinh doanh thương mại hoặc công nghiệp, đặc biệt là chủ sở hữu hoặc giám đốc điều hành	Please check the businessman before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-bccb18cfa1d8	ceiling	SIⱢꞮŊ	/ˈsiɫɪŋ/	verb	thứ bao phủ căn phòng ở trên cao	They decided to ceiling the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-c0d519d52936	colorful	KƏⱢɝFƏⱢ	/ˈkəɫɝfəɫ/	adjective	có nhiều màu sắc khác nhau	This is a colorful solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-c7b9230bf9d3	compensate	KⱭMPƏN-seɪt	/ˈkɑmpənˌseɪt/	verb	để trả tiền cho một dịch vụ	They decided to compensate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7db-704f-8b82-cbdbaaf0a528	costume	KⱭSTUM	/ˈkɑstum/	noun	một cái gì đó bất thường mà bạn ăn mặc, ví dụ như cho Hallowe'en	Please check the costume before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7dc-77f2-b885-a95e8de5287d	editorial	ƐDƏ-tɔɹiəɫ	/ˌɛdəˈtɔɹiəɫ/	adjective	một bài báo do biên tập viên viết	This is a editorial solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-af27a159df6d	effectiveness	IFƐKTꞮVNƏS	/ˈifɛktɪvnəs/	noun	trạng thái hoạt động bình thường hoặc như mong đợi	Please check the effectiveness before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-b306d032a636	facilitate	FƏ-sɪɫə-teɪt	/fəˈsɪɫəˌteɪt/	verb	để giúp đỡ hoặc làm cho dễ dàng hơn	They decided to facilitate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-b7eaee388203	firefighter	FAꞮɹ-faɪtɝ	/ˈfaɪɹˌfaɪtɝ/	noun	một người có nhiệm vụ dập lửa hoặc cứu người khỏi những tình huống nguy hiểm	Please check the firefighter before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-b92dabbc2d54	gasoline	ꞬÆSƏ-ɫin	/ˈɡæsəˌɫin/	noun	nhiên liệu được sử dụng trong hầu hết các loại xe có động cơ	Please check the gasoline before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-bdb733f22294	inappropriate	ꞮNƏ-pɹoʊpɹiɪt	/ˌɪnəˈpɹoʊpɹiɪt/	verb	không phù hợp để sử dụng trong một tình huống nhất định	They decided to inappropriate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-c08a055e3730	internet	ꞮNTɝ-nɛt	/ˈɪntɝˌnɛt/	noun	đường cao tốc thông tin, web trên toàn thế giới	Please check the internet before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-c787d448ec2d	layout	ⱢEꞮ-aʊt	/ˈɫeɪˌaʊt/	noun	kế hoạch về cách nó được đặt ra	Please check the layout before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dc-77f2-b885-cbc2cbd59972	lunchtime	ⱢƏNTƩ-taɪm	/ˈɫəntʃˌtaɪm/	noun	Thời gian thông thường để ăn bữa trưa	Please check the lunchtime before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dd-7579-a4b7-248b76dd30e4	pharmaceutical	FⱭɹMƏ-sutɪkəɫ	/ˌfɑɹməˈsutɪkəɫ/	adjective	liên quan đến việc chuẩn bị và làm thuốc	This is a pharmaceutical solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dd-7579-a4b7-28043e860cf6	plausible	PⱢƆZƏBƏⱢ	/ˈpɫɔzəbəɫ/	adjective	có vẻ như điều đó có thể là sự thật	This is a plausible solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dd-7579-a4b7-2e15ee624931	premium	PɹIMIƏM	/ˈpɹimiəm/	noun	một khoản thanh toán bổ sung được thêm vào chi phí	Please check the premium before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7dd-7579-a4b7-33949198b223	safely	SEꞮFⱢI	/ˈseɪfɫi/	adverb	theo cách không nguy hiểm	She responded safely to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dd-7579-a4b7-35d6e831589f	simplify	SꞮMPⱢƏ-faɪ	/ˈsɪmpɫəˌfaɪ/	verb	làm cho dễ hiểu hơn	They decided to simplify the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7dd-7579-a4b7-38ad94c2f8b0	specialty	SPEꞮƩƏⱢTI	/ˈspeɪʃəɫti/	noun	điều gì đó mà bạn rất giỏi	Please check the specialty before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-e33ece70c89b	tech	TƐK	/ˈtɛk/	noun	dạng viết tắt của từ 'công nghệ'	Please check the tech before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-e4d2d6ce0366	unexpected	ƏNꞮK-spɛktɪd	/ˌənɪkˈspɛktɪd/	verb	là một bất ngờ	They decided to unexpected the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-e84c6adf3f1e	unspecified	ƏN-spɛsə-faɪd	/ənˈspɛsəˌfaɪd/	verb	không được đánh dấu rõ ràng hoặc không được biết đến	They decided to unspecified the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-ee12b61324ed	adhere	ƏD-hɪɹ	/ədˈhɪɹ/	noun	để tuân thủ hoặc tuân thủ, ví dụ: tuân thủ các quy tắc	Please check the adhere before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-f1f59866465f	bankrupt	BÆŊKɹƏPT	/ˈbæŋkɹəpt/	noun	không còn tiền	Please check the bankrupt before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7de-7290-86bd-f58b7c706e4e	caution	KⱭƩƏN	/ˈkɑʃən/	noun	một lời cảnh báo phải cẩn thận	Please check the caution before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-f84eadf55135	clip	KⱢꞮP	/ˈkɫɪp/	noun	để cắt ngắn, cắt	Please check the clip before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86bd-fee1f9995484	comply	KƏM-pɫaɪ	/kəmˈpɫaɪ/	adverb	tuân theo một quy tắc	She responded comply to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86be-0283881f2533	diner	DAꞮNɝ	/ˈdaɪnɝ/	noun	một nhà hàng nhỏ, không trang trọng	Please check the diner before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7de-7290-86be-0789dc1442a2	duplicate	DUPⱢƏ-keɪt	/ˈdupɫəˌkeɪt/	verb	tạo một bản sao chính xác	They decided to duplicate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7df-7798-89f2-f379480bc503	eager	IꞬɝ	/ˈiɡɝ/	noun	hào hứng giúp đỡ hoặc làm điều gì đó	Please check the eager before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7df-7798-89f2-f4851c3156cf	economist	I-kɑnəmɪst	/iˈkɑnəmɪst/	noun	một chuyên gia về khoa học kinh tế	Please check the economist before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7df-7798-89f2-f937af53ec5e	embassy	ƐMBƏSI	/ˈɛmbəsi/	noun	văn phòng của một đại sứ	Please check the embassy before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7df-7798-89f2-fed330d78689	fasten	FÆSƏN	/ˈfæsən/	verb	cố định chặt chẽ với nhau	They decided to fasten the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7df-7798-89f3-03c661440b5a	harmful	HⱭɹMFƏⱢ	/ˈhɑɹmfəɫ/	adjective	gây hại, tổn thương	This is a harmful solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-c400ebdecaca	informative	ꞮN-fɔɹmətɪv	/ˌɪnˈfɔɹmətɪv/	adjective	cho bạn biết rất nhiều sự thật hữu ích về một điều gì đó	This is a informative solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-c97b8f6c3e55	institute	ꞮNSTƏ-tut	/ˈɪnstəˌtut/	noun	như trường học hoặc đại học	Please check the institute before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-ccb92fcc3ede	kit	KꞮT	/ˈkɪt/	noun	một hộp dụng cụ hoặc thiết bị	Please check the kit before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-d151024d4fc7	locally	ⱢOƱKƏⱢI	/ˈɫoʊkəɫi/	adverb	trong một khu vực cụ thể	She responded locally to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-d44794b7cd1b	mentor	MƐN-tɔɹ	/ˈmɛnˌtɔɹ/	noun	cố vấn cá nhân hoặc giáo viên	Please check the mentor before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-d8fcada7f9e6	nominate	NⱭMƏ-neɪt	/ˈnɑməˌneɪt/	verb	đề nghị ai đó làm hoặc trở thành một cái gì đó	They decided to nominate the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-dfa80f6ee76e	opt	ⱭPT	/ˈɑpt/	noun	Chọn đi	Please check the opt before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-e0614f0760a0	parade	Pɝ-eɪd	/pɝˈeɪd/	noun	đi bộ hoặc diễu hành	Please check the parade before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-e50673774ee4	physician	FƏ-zɪʃən	/fəˈzɪʃən/	noun	Doctor of Medicine	Please check the physician before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e0-75f3-9871-ea81d24cfbb8	polish	PⱭⱢꞮƩ	/ˈpɑɫɪʃ/	noun	để làm cho một cái gì đó tỏa sáng với một miếng vải	Please check the polish before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e7-700b-9571-bb7925e92c20	postage	POƱSTƏDƷ	/ˈpoʊstədʒ/	noun	phí gửi thư	Please check the postage before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e7-700b-9571-bda0c4a74059	recreational	ɹƐKɹI-eɪʃənəɫ	/ˌɹɛkɹiˈeɪʃənəɫ/	adjective	những gì bạn làm để thư giãn trong thời gian rảnh rỗi	This is a recreational solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e7-700b-9571-c3a88c0dfe63	rehearse	ɹI-hɝs	/ɹiˈhɝs/	noun	thực hành để bạn làm tốt hơn	Please check the rehearse before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e7-700b-9571-c56f1a9fc370	removal	ɹꞮ-muvəɫ	/ɹɪˈmuvəɫ/	adjective	để lấy đi và đặt ở một nơi khác	This is a removal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e7-700b-9571-c82af4431b43	satisfactory	SÆTƏS-fæktɹi	/ˌsætəsˈfæktɹi/	noun	có thể chấp nhận	Please check the satisfactory before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	logistics
01a0aec8-e7e7-700b-9571-cefaf9b2fcc0	seasonal	SIZƏNƏⱢ	/ˈsizənəɫ/	adjective	chỉ xảy ra vào một thời điểm nhất định trong năm	This is a seasonal solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-010d6ca9c58b	separately	SƐPɝƏTⱢI	/ˈsɛpɝətɫi/	adverb	để làm từng việc một, không phải cùng nhau	She responded separately to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-05aa04c9f5b6	turnover	Tɝ-noʊvɝ	/ˈtɝˌnoʊvɝ/	noun	số tiền mà một doanh nghiệp kiếm được trong một khoảng thời gian	Please check the turnover before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-08c027b26d68	unnecessary	ƏN-nɛsə-sɛɹi	/ənˈnɛsəˌsɛɹi/	noun	Không cần thiết	Please check the unnecessary before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-0ef9cb029aaf	accordingly	Ə-kɔɹdɪŋɫi	/əˈkɔɹdɪŋɫi/	adverb	do đó, vì vậy	She responded accordingly to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-1270b4aa218b	apple	ÆPƏⱢ	/ˈæpəɫ/	noun	một loại trái cây từ cây có màu xanh lá cây, đỏ hoặc vàng	Please check the apple before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-1561605ab25e	applicable	ÆPⱢƏKƏBƏⱢ	/ˈæpɫəkəbəɫ/	adjective	có liên quan	This is a applicable solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-18a71428e200	auction	ⱭKƩƏN	/ˈɑkʃən/	noun	nơi mọi thứ được bán cho người trả tiền cao nhất	Please check the auction before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7e8-7607-9668-1c6daa41e7ea	balcony	BÆⱢKƏNI	/ˈbæɫkəni/	noun	một khu vực sàn nhỏ với một bức tường hoặc hàng rào xung quanh nó được nối với bên ngoài của một tòa nhà	Please check the balcony before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-210920cede15	basement	BEꞮSMƏNT	/ˈbeɪsmənt/	noun	cao độ dưới tầng trệt	Please check the basement before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-27e52dd8aa20	beforehand	BꞮ-fɔɹ-hænd	/bɪˈfɔɹˌhænd/	noun	trước đó trong thời gian	Please check the beforehand before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e8-7607-9668-2bf0434df766	culinary	KJUⱢꞮ-nɛɹi	/ˈkjuɫɪˌnɛɹi/	noun	liên quan đến nấu ăn	Please check the culinary before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-77b0fb78996e	documentary	DⱭKJƏ-mɛnɝi	/ˌdɑkjəˈmɛnɝi/	noun	một bộ phim về một cuộc sống hoặc sự kiện có thật	Please check the documentary before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	office
01a0aec8-e7e9-71e9-85ce-78f5475a1b2f	downturn	DAƱN-tɝn	/ˈdaʊnˌtɝn/	noun	sự sụt giảm thành công của một doanh nghiệp hoặc nền kinh tế	Please check the downturn before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-7f4f3f55e8d2	earthquake	ɝΘ-kweɪk	/ˈɝθˌkweɪk/	noun	khi mặt đất rung chuyển do sự chuyển động tự nhiên của đá dưới lòng đất	Please check the earthquake before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-82af471cef37	elegant	ƐⱢƏꞬƏNT	/ˈɛɫəɡənt/	adjective	đẹp hay không đẹp	This is a elegant solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-864610dc6491	excessive	ꞮK-sɛsɪv	/ɪkˈsɛsɪv/	adjective	quá nhiều của một cái gì đó	This is a excessive solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-8b39b698f4a6	generic	DƷƏ-nɛɹɪk	/dʒəˈnɛɹɪk/	noun	chung chung; tổng	Please check the generic before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-8f550c25163a	jazz	DƷÆZ	/ˈdʒæz/	noun	Anh thích bản nhạc này?	Please check the jazz before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-91adaed75ebe	lifetime	ⱢAꞮF-taɪm	/ˈɫaɪfˌtaɪm/	noun	Thời gian giữa khi một người được sinh ra và khi họ chết	Please check the lifetime before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-968fefc812b7	massage	MƏ-sɑʒ	/məˈsɑʒ/	noun	xoa bóp cơ thể theo một cách đặc biệt làm cho nó cảm thấy tốt hơn	Please check the massage before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	sales
01a0aec8-e7e9-71e9-85ce-9815b7fd245f	maximize	MÆKSƏ-maɪz	/ˈmæksəˌmaɪz/	verb	để tận dụng tối đa	They decided to maximize the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7e9-71e9-85ce-9f222e2e6e2c	mild	MAꞮⱢD	/ˈmaɪɫd/	noun	mềm mại, nhẹ nhàng, không mạnh mẽ trong tự nhiên	Please check the mild before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-ada2580d00b1	ongoing	ⱭN-ɡoʊɪŋ	/ˈɑnˌɡoʊɪŋ/	verb	vẫn đang diễn ra	They decided to ongoing the plan after the review.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-b11bfad744de	periodically	PIɹI-ɑdɪkəɫi	/ˌpiɹiˈɑdɪkəɫi/	adverb	thường xuyên, vào những thời điểm thông thường	She responded periodically to the client's request.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-b79460cf4b54	pie	PAꞮ	/ˈpaɪ/	noun	bánh ngọt tròn, phủ một lớp nhân như anh đào hoặc táo	Please check the pie before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-b839a13e458e	plug	PⱢƏꞬ	/ˈpɫəɡ/	noun	để lấp đầy một cái lỗ	Please check the plug before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-bf36fcea732a	recruitment	ɹƏ-kɹutmənt	/ɹəˈkɹutmənt/	noun	hành vi thuê người cho doanh nghiệp	Please check the recruitment before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	hr
01a0aec8-e7ea-73db-bc11-c3234612e761	referee	ɹƐFɝ-i	/ˌɹɛfɝˈi/	noun	người giám sát một cái gì đó để đảm bảo rằng các quy tắc được tuân thủ	Please check the referee before the meeting.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
01a0aec8-e7ea-73db-bc11-c47ad5fa4c9b	referral	ɹꞮ-fɝəɫ	/ɹɪˈfɝəɫ/	adjective	đề xuất của ai đó hoặc một cái gì đó	This is a referral solution for our team.	\N	hard	2026-09-17 09:53:18.122292+00	2026-09-17 09:53:18.122292+00	f	\N	toeic	core
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: -
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 9, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: -
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: accounts accounts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_pkey PRIMARY KEY (id);


--
-- Name: content_sources content_sources_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.content_sources
    ADD CONSTRAINT content_sources_pkey PRIMARY KEY (id);


--
-- Name: courses courses_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_pkey PRIMARY KEY (id);


--
-- Name: courses courses_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.courses
    ADD CONSTRAINT courses_slug_unique UNIQUE (slug);


--
-- Name: grammar_examples grammar_examples_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_examples
    ADD CONSTRAINT grammar_examples_pkey PRIMARY KEY (id);


--
-- Name: grammar_lessons grammar_lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_lessons
    ADD CONSTRAINT grammar_lessons_pkey PRIMARY KEY (id);


--
-- Name: grammar_lessons grammar_lessons_topic_version_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_lessons
    ADD CONSTRAINT grammar_lessons_topic_version_unique UNIQUE (topic_id, version);


--
-- Name: grammar_mistakes grammar_mistakes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_mistakes
    ADD CONSTRAINT grammar_mistakes_pkey PRIMARY KEY (id);


--
-- Name: grammar_rules grammar_rules_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_rules
    ADD CONSTRAINT grammar_rules_pkey PRIMARY KEY (id);


--
-- Name: grammar_topic_relations grammar_topic_relations_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topic_relations
    ADD CONSTRAINT grammar_topic_relations_pkey PRIMARY KEY (id);


--
-- Name: grammar_topic_relations grammar_topic_relations_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topic_relations
    ADD CONSTRAINT grammar_topic_relations_unique UNIQUE (from_topic_id, to_topic_id, relation_type);


--
-- Name: grammar_topics grammar_topics_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topics
    ADD CONSTRAINT grammar_topics_pkey PRIMARY KEY (id);


--
-- Name: grammar_topics grammar_topics_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topics
    ADD CONSTRAINT grammar_topics_slug_unique UNIQUE (slug);


--
-- Name: lesson_vocabularies lesson_vocabularies_lesson_vocab_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_vocabularies
    ADD CONSTRAINT lesson_vocabularies_lesson_vocab_unique UNIQUE (lesson_id, vocabulary_id);


--
-- Name: lesson_vocabularies lesson_vocabularies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_vocabularies
    ADD CONSTRAINT lesson_vocabularies_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_course_order_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_course_order_unique UNIQUE (course_id, order_index);


--
-- Name: lessons lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_pkey PRIMARY KEY (id);


--
-- Name: lessons lessons_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_slug_unique UNIQUE (slug);


--
-- Name: listening_lessons listening_lessons_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listening_lessons
    ADD CONSTRAINT listening_lessons_pkey PRIMARY KEY (id);


--
-- Name: listening_lessons listening_lessons_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listening_lessons
    ADD CONSTRAINT listening_lessons_slug_unique UNIQUE (slug);


--
-- Name: placement_test_attempts placement_test_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_attempts
    ADD CONSTRAINT placement_test_attempts_pkey PRIMARY KEY (id);


--
-- Name: placement_test_questions placement_test_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_questions
    ADD CONSTRAINT placement_test_questions_pkey PRIMARY KEY (id);


--
-- Name: placement_test_questions placement_test_questions_test_order_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_questions
    ADD CONSTRAINT placement_test_questions_test_order_unique UNIQUE (placement_test_id, order_index);


--
-- Name: placement_tests placement_tests_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_tests
    ADD CONSTRAINT placement_tests_pkey PRIMARY KEY (id);


--
-- Name: placement_tests placement_tests_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_tests
    ADD CONSTRAINT placement_tests_slug_unique UNIQUE (slug);


--
-- Name: quiz_answers quiz_answers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_pkey PRIMARY KEY (id);


--
-- Name: quiz_answers quiz_answers_question_order_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_question_order_unique UNIQUE (question_id, order_index);


--
-- Name: quiz_attempts quiz_attempts_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_pkey PRIMARY KEY (id);


--
-- Name: quiz_questions quiz_questions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_pkey PRIMARY KEY (id);


--
-- Name: quiz_questions quiz_questions_quiz_order_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_quiz_order_unique UNIQUE (quiz_id, order_index);


--
-- Name: quizzes quizzes_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_pkey PRIMARY KEY (id);


--
-- Name: quizzes quizzes_slug_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quizzes
    ADD CONSTRAINT quizzes_slug_unique UNIQUE (slug);


--
-- Name: sessions sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_pkey PRIMARY KEY (id);


--
-- Name: sessions sessions_token_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_token_unique UNIQUE (token);


--
-- Name: user_achievements user_achievements_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_pkey PRIMARY KEY (id);


--
-- Name: user_achievements user_achievements_user_key_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_key_unique UNIQUE (user_id, achievement_key);


--
-- Name: user_daily_activity user_daily_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_daily_activity
    ADD CONSTRAINT user_daily_activity_pkey PRIMARY KEY (id);


--
-- Name: user_daily_activity user_daily_activity_user_date_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_daily_activity
    ADD CONSTRAINT user_daily_activity_user_date_unique UNIQUE (user_id, activity_date);


--
-- Name: user_grammar_progress user_grammar_progress_user_id_topic_id_pk; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_grammar_progress
    ADD CONSTRAINT user_grammar_progress_user_id_topic_id_pk PRIMARY KEY (user_id, topic_id);


--
-- Name: user_progress user_progress_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_pkey PRIMARY KEY (id);


--
-- Name: user_progress user_progress_user_lesson_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_lesson_unique UNIQUE (user_id, lesson_id);


--
-- Name: user_vocabularies user_vocabularies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_vocabularies
    ADD CONSTRAINT user_vocabularies_pkey PRIMARY KEY (id);


--
-- Name: user_vocabularies user_vocabularies_user_vocab_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_vocabularies
    ADD CONSTRAINT user_vocabularies_user_vocab_unique UNIQUE (user_id, vocabulary_id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: verifications verifications_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.verifications
    ADD CONSTRAINT verifications_pkey PRIMARY KEY (id);


--
-- Name: vocabularies vocabularies_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT vocabularies_pkey PRIMARY KEY (id);


--
-- Name: grammar_examples_normalized_hash_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_examples_normalized_hash_idx ON public.grammar_examples USING btree (normalized_hash);


--
-- Name: grammar_examples_topic_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_examples_topic_idx ON public.grammar_examples USING btree (topic_id);


--
-- Name: grammar_lessons_topic_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_lessons_topic_status_idx ON public.grammar_lessons USING btree (topic_id, status);


--
-- Name: grammar_mistakes_topic_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_mistakes_topic_idx ON public.grammar_mistakes USING btree (topic_id);


--
-- Name: grammar_rules_topic_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_rules_topic_idx ON public.grammar_rules USING btree (topic_id);


--
-- Name: grammar_topics_level_category_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_topics_level_category_idx ON public.grammar_topics USING btree (level, category);


--
-- Name: grammar_topics_slug_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_topics_slug_idx ON public.grammar_topics USING btree (slug);


--
-- Name: grammar_topics_summary_vi_trgm_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_topics_summary_vi_trgm_idx ON public.grammar_topics USING gin (summary_vi public.gin_trgm_ops);


--
-- Name: grammar_topics_title_en_trgm_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_topics_title_en_trgm_idx ON public.grammar_topics USING gin (title_en public.gin_trgm_ops);


--
-- Name: grammar_topics_title_vi_trgm_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX grammar_topics_title_vi_trgm_idx ON public.grammar_topics USING gin (title_vi public.gin_trgm_ops);


--
-- Name: lesson_vocabularies_lesson_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX lesson_vocabularies_lesson_idx ON public.lesson_vocabularies USING btree (lesson_id);


--
-- Name: quiz_answers_question_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quiz_answers_question_idx ON public.quiz_answers USING btree (question_id);


--
-- Name: quiz_attempts_user_completed_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quiz_attempts_user_completed_idx ON public.quiz_attempts USING btree (user_id, completed_at);


--
-- Name: quiz_questions_quiz_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX quiz_questions_quiz_idx ON public.quiz_questions USING btree (quiz_id);


--
-- Name: user_grammar_progress_user_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_grammar_progress_user_idx ON public.user_grammar_progress USING btree (user_id);


--
-- Name: user_progress_user_status_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_progress_user_status_idx ON public.user_progress USING btree (user_id, status);


--
-- Name: user_vocabularies_user_learned_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_vocabularies_user_learned_idx ON public.user_vocabularies USING btree (user_id, is_learned);


--
-- Name: user_vocabularies_user_pinned_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX user_vocabularies_user_pinned_idx ON public.user_vocabularies USING btree (user_id, is_pinned);


--
-- Name: vocabularies_catalog_source_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vocabularies_catalog_source_idx ON public.vocabularies USING btree (catalog_source);


--
-- Name: vocabularies_catalog_source_topic_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vocabularies_catalog_source_topic_idx ON public.vocabularies USING btree (catalog_source, topic);


--
-- Name: vocabularies_catalog_word_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX vocabularies_catalog_word_unique ON public.vocabularies USING btree (word) WHERE (is_manual = false);


--
-- Name: vocabularies_manual_word_creator_unique; Type: INDEX; Schema: public; Owner: -
--

CREATE UNIQUE INDEX vocabularies_manual_word_creator_unique ON public.vocabularies USING btree (word, created_by_user_id) WHERE (is_manual = true);


--
-- Name: vocabularies_word_idx; Type: INDEX; Schema: public; Owner: -
--

CREATE INDEX vocabularies_word_idx ON public.vocabularies USING btree (word);


--
-- Name: accounts accounts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: grammar_examples grammar_examples_rule_id_grammar_rules_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_examples
    ADD CONSTRAINT grammar_examples_rule_id_grammar_rules_id_fk FOREIGN KEY (rule_id) REFERENCES public.grammar_rules(id) ON DELETE SET NULL;


--
-- Name: grammar_examples grammar_examples_source_id_content_sources_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_examples
    ADD CONSTRAINT grammar_examples_source_id_content_sources_id_fk FOREIGN KEY (source_id) REFERENCES public.content_sources(id) ON DELETE SET NULL;


--
-- Name: grammar_examples grammar_examples_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_examples
    ADD CONSTRAINT grammar_examples_topic_id_grammar_topics_id_fk FOREIGN KEY (topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_lessons grammar_lessons_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_lessons
    ADD CONSTRAINT grammar_lessons_topic_id_grammar_topics_id_fk FOREIGN KEY (topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_mistakes grammar_mistakes_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_mistakes
    ADD CONSTRAINT grammar_mistakes_topic_id_grammar_topics_id_fk FOREIGN KEY (topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_rules grammar_rules_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_rules
    ADD CONSTRAINT grammar_rules_topic_id_grammar_topics_id_fk FOREIGN KEY (topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_topic_relations grammar_topic_relations_from_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topic_relations
    ADD CONSTRAINT grammar_topic_relations_from_topic_id_grammar_topics_id_fk FOREIGN KEY (from_topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_topic_relations grammar_topic_relations_to_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topic_relations
    ADD CONSTRAINT grammar_topic_relations_to_topic_id_grammar_topics_id_fk FOREIGN KEY (to_topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: grammar_topics grammar_topics_parent_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topics
    ADD CONSTRAINT grammar_topics_parent_id_grammar_topics_id_fk FOREIGN KEY (parent_id) REFERENCES public.grammar_topics(id) ON DELETE SET NULL;


--
-- Name: grammar_topics grammar_topics_quiz_id_quizzes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.grammar_topics
    ADD CONSTRAINT grammar_topics_quiz_id_quizzes_id_fk FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE SET NULL;


--
-- Name: lesson_vocabularies lesson_vocabularies_lesson_id_lessons_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_vocabularies
    ADD CONSTRAINT lesson_vocabularies_lesson_id_lessons_id_fk FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: lesson_vocabularies lesson_vocabularies_vocabulary_id_vocabularies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lesson_vocabularies
    ADD CONSTRAINT lesson_vocabularies_vocabulary_id_vocabularies_id_fk FOREIGN KEY (vocabulary_id) REFERENCES public.vocabularies(id) ON DELETE CASCADE;


--
-- Name: lessons lessons_course_id_courses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.lessons
    ADD CONSTRAINT lessons_course_id_courses_id_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE CASCADE;


--
-- Name: listening_lessons listening_lessons_course_id_courses_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listening_lessons
    ADD CONSTRAINT listening_lessons_course_id_courses_id_fk FOREIGN KEY (course_id) REFERENCES public.courses(id) ON DELETE SET NULL;


--
-- Name: listening_lessons listening_lessons_quiz_id_quizzes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.listening_lessons
    ADD CONSTRAINT listening_lessons_quiz_id_quizzes_id_fk FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE SET NULL;


--
-- Name: placement_test_attempts placement_test_attempts_placement_test_id_placement_tests_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_attempts
    ADD CONSTRAINT placement_test_attempts_placement_test_id_placement_tests_id_fk FOREIGN KEY (placement_test_id) REFERENCES public.placement_tests(id) ON DELETE CASCADE;


--
-- Name: placement_test_attempts placement_test_attempts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_attempts
    ADD CONSTRAINT placement_test_attempts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: placement_test_questions placement_test_questions_placement_test_id_placement_tests_id_f; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.placement_test_questions
    ADD CONSTRAINT placement_test_questions_placement_test_id_placement_tests_id_f FOREIGN KEY (placement_test_id) REFERENCES public.placement_tests(id) ON DELETE CASCADE;


--
-- Name: quiz_answers quiz_answers_question_id_quiz_questions_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_answers
    ADD CONSTRAINT quiz_answers_question_id_quiz_questions_id_fk FOREIGN KEY (question_id) REFERENCES public.quiz_questions(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_quiz_id_quizzes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_quiz_id_quizzes_id_fk FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: quiz_attempts quiz_attempts_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_attempts
    ADD CONSTRAINT quiz_attempts_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: quiz_questions quiz_questions_quiz_id_quizzes_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.quiz_questions
    ADD CONSTRAINT quiz_questions_quiz_id_quizzes_id_fk FOREIGN KEY (quiz_id) REFERENCES public.quizzes(id) ON DELETE CASCADE;


--
-- Name: sessions sessions_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.sessions
    ADD CONSTRAINT sessions_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_achievements user_achievements_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_achievements
    ADD CONSTRAINT user_achievements_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_daily_activity user_daily_activity_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_daily_activity
    ADD CONSTRAINT user_daily_activity_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_grammar_progress user_grammar_progress_topic_id_grammar_topics_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_grammar_progress
    ADD CONSTRAINT user_grammar_progress_topic_id_grammar_topics_id_fk FOREIGN KEY (topic_id) REFERENCES public.grammar_topics(id) ON DELETE CASCADE;


--
-- Name: user_grammar_progress user_grammar_progress_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_grammar_progress
    ADD CONSTRAINT user_grammar_progress_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_lesson_id_lessons_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_lesson_id_lessons_id_fk FOREIGN KEY (lesson_id) REFERENCES public.lessons(id) ON DELETE CASCADE;


--
-- Name: user_progress user_progress_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_progress
    ADD CONSTRAINT user_progress_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_vocabularies user_vocabularies_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_vocabularies
    ADD CONSTRAINT user_vocabularies_user_id_users_id_fk FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: user_vocabularies user_vocabularies_vocabulary_id_vocabularies_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.user_vocabularies
    ADD CONSTRAINT user_vocabularies_vocabulary_id_vocabularies_id_fk FOREIGN KEY (vocabulary_id) REFERENCES public.vocabularies(id) ON DELETE CASCADE;


--
-- Name: vocabularies vocabularies_created_by_user_id_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.vocabularies
    ADD CONSTRAINT vocabularies_created_by_user_id_users_id_fk FOREIGN KEY (created_by_user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

\unrestrict IA7IbRgAhKQI0iseQJxGcfYIcVz4GcLhhfZPAQiYMZ2abApBd4a7ddIbgQXKyhO

