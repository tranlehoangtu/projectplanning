package com.javacode.Project_Planning.service;

import java.util.List;
import java.util.Optional;
import java.util.function.Function;

import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery.FetchableFluentQuery;
import org.springframework.stereotype.Service;

import com.javacode.Project_Planning.domain.model.Logo;
import com.javacode.Project_Planning.repository.LogoRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LogoService {
	private final LogoRepository logoRepository;

	public <S extends Logo> S save(S entity) {
		return logoRepository.save(entity);
	}

	public <S extends Logo> Optional<S> findOne(Example<S> example) {
		return logoRepository.findOne(example);
	}

	public <S extends Logo> List<S> saveAll(Iterable<S> entities) {
		return logoRepository.saveAll(entities);
	}

	public Page<Logo> findAll(Pageable pageable) {
		return logoRepository.findAll(pageable);
	}

	public List<Logo> findAll() {
		return logoRepository.findAll();
	}

	public List<Logo> findAll(Sort sort) {
		return logoRepository.findAll(sort);
	}

	public <S extends Logo> S insert(S entity) {
		return logoRepository.insert(entity);
	}

	public <S extends Logo> List<S> insert(Iterable<S> entities) {
		return logoRepository.insert(entities);
	}

	public <S extends Logo> Page<S> findAll(Example<S> example, Pageable pageable) {
		return logoRepository.findAll(example, pageable);
	}

	public Optional<Logo> findById(String id) {
		return logoRepository.findById(id);
	}

	public <S extends Logo> List<S> findAll(Example<S> example) {
		return logoRepository.findAll(example);
	}

	public boolean existsById(String id) {
		return logoRepository.existsById(id);
	}

	public <S extends Logo> long count(Example<S> example) {
		return logoRepository.count(example);
	}

	public Iterable<Logo> findAllById(Iterable<String> ids) {
		return logoRepository.findAllById(ids);
	}

	public <S extends Logo> boolean exists(Example<S> example) {
		return logoRepository.exists(example);
	}

	public <S extends Logo> List<S> findAll(Example<S> example, Sort sort) {
		return logoRepository.findAll(example, sort);
	}

	public <S extends Logo, R> R findBy(Example<S> example, Function<FetchableFluentQuery<S>, R> queryFunction) {
		return logoRepository.findBy(example, queryFunction);
	}

	public long count() {
		return logoRepository.count();
	}

	public void deleteById(String id) {
		logoRepository.deleteById(id);
	}

	public void delete(Logo entity) {
		logoRepository.delete(entity);
	}

	public void deleteAllById(Iterable<? extends String> ids) {
		logoRepository.deleteAllById(ids);
	}

	public void deleteAll(Iterable<? extends Logo> entities) {
		logoRepository.deleteAll(entities);
	}

	public void deleteAll() {
		logoRepository.deleteAll();
	}

}
