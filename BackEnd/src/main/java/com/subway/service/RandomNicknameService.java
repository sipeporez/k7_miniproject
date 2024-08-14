package com.subway.service;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RandomNicknameService {
	
	// resource/static 경로에 있는 파일을 읽어오는 ResourceLoader
	private final ResourceLoader rl;

	public List<String> loadFileToStringList(Resource file) throws Exception {
		List<String> list = new ArrayList<>();
		try (BufferedReader reader = new BufferedReader(
				new InputStreamReader(file.getInputStream(), StandardCharsets.UTF_8))) {
			String line = reader.readLine();
			if (line != null) {
				String lineList[] = line.split(", ");
				for (String word : lineList) {
					list.add(word);
				}
			}
		}
		return list;
	}
	
	public String makeRandomNickname() throws Exception {
		List<String> adjList = loadFileToStringList(rl.getResource("classpath:static/adjective.txt"));
		List<String> aniList = loadFileToStringList(rl.getResource("classpath:static/animal.txt"));
		Random rnd = new Random();
		if ((adjList.get(rnd.nextInt(adjList.size())) + " " + aniList.get(rnd.nextInt(aniList.size()))).length() > 16) {
			makeRandomNickname();
		}
		return adjList.get(rnd.nextInt(adjList.size())) + " " + aniList.get(rnd.nextInt(aniList.size()));
	}

}
